import {render, remove, create, addClass, hasClass, remClass, find, write, detect, undetect, style, attribs, findAll, checkCollision, checkCollisionReal} from "../scripts/QoL"
import { detectTile, getTiles } from "../scripts/canvasFuncs"
import { collision_tiles } from "../scripts/canvasFuncs"
import pdsrc from "../images/package_drone.png";
import lrdsrc from "../images/lightning_rod_drone.png";
import ffdsrc from "../images/force_field_drone.png";
import mdsrc from "../images/magnet_drone.png"
import { package_drone, wrapper } from "../scripts/elements";
import { displayInfo } from "./infoScreen";

let sc_list = [null, null, null, null];
let sc_names = ["package_drone","magnet_drone","lightning_rod_drone","force_field_drone"]
//order: pd, md, lrd, ffd
let magnet_drone;
let lightning_rod_drone;
let force_field_drone;

const spriteCanvas = (wrapper, name, size, imgsrc, x, y, speed, show, frames) =>{

    const canv = create("canvas");
    addClass(canv, ["spritecanvas", name]);
    attribs(canv, ["id", "width", "height"], [name, `${64}px`, `${64}px`]);

    let img;
    if (imgsrc === "none"){
        img = "none";
    }
    else{
        img = new Image();
        img.src = imgsrc;
    }
    
    style(canv, `
        position:absolute;
        top: ${y}px;
        left: ${x}px;
    `);    

    let obj = { 
        name,
        size,
        ele: canv, 
        x,
        y,
        direction: "left",
        img,
        speed,
        direction_data: {"none":0},
        draw_index: 0,
        frame:0,
        show,
        frames,
        updates_per_frames: 2,
        timer: 1,
    };

    if(sc_names.includes(name)) sc_list[getIndex(name)] = obj;
    if (show){
        const ctx = canv.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        img.onload = function() {
            ctx.clearRect(0,0,64,64);
            ctx.drawImage(img, 0, size*0, size, size, 0, 0, 64,64);
        }
        render(wrapper, canv);
        detect(canv, "mouseenter", updateInfo);
    }
    if(name === "package_drone"){
        package_drone = canv;
    }

    canv.dataset.imgsrc = imgsrc;

    return canv;
}

const updateInfo = (evt) =>{
    displayInfo(evt.target.id, evt.target);
}

const getIndex = (name) => {
    let index;

    if (name === "package_drone"){
        index = 0
    }
    else if (name === "lightning_rod_drone" || name ==="Lightning_Rod_Drone"){
        index = 2
    }
    else if (name === "magnet_drone" || name === "Magnet_Drone"){
        index = 1
    }
    else if (name === "force_field_drone" || "Force-field_Drone"){
        index = 3
    }

    return index;

}

const moveTowards = (index, x, y, wind) => {
    const obj = sc_list[index]
    const speed = wind ? 2 : obj.speed;
    const myx = x-obj.size/2;
    const myy = y-obj.size/2;
    const dx = myx-obj.x;
    const dy = myy-obj.y;
    const mag = Math.sqrt(dx*dx + dy*dy);
    const ux = (dx/mag)*speed;
    const uy = (dy/mag)*speed;
    const nx = obj.x+ux-obj.size/2;
    const ny = obj.y+uy-obj.size/2;
    let angle = Math.atan(-uy/ux);
    const incoming_tile = detectTile(nx,ny);


    let inpath = false
    findAll(".edge").forEach(path => {
        if (checkCollision(path, obj.ele)){
            inpath = true;
        }
    })

    if (inpath){
        if(obj.name === "package_drone")
        {
            if (checkCollisionReal(find(".edge.left"), obj.ele)) {teleport( index, obj.x+5, obj.y); obj.x=obj.x+5}
            if (checkCollisionReal(find(".edge.right"), obj.ele)) {teleport( index, obj.x-5, obj.y); obj.x=obj.x-5}
            if (checkCollisionReal(find(".edge.top"), obj.ele)) {teleport( index, obj.x, obj.y+5); obj.y=obj.y+5}
            if (checkCollisionReal(find(".edge.bottom"), obj.ele)) {teleport( index, obj.x, obj.y-5); obj.y=obj.y-5}
        }
    }
    else if (mag>obj.speed){
        sc_list[index].x = nx+obj.size/2;
        sc_list[index].y = ny+obj.size/2;
        teleport(index, nx, ny)
        let angle = Math.atan(-uy/ux);
        if(ux < 0){
            if (-uy < 0){
                angle = angle - Math.PI;
            }
            else{
                angle = angle+ Math.PI;
            }
        }
        angle = angle*(180/Math.PI)
        let direction = "left";
        if (angle >= 22.5 && angle <= 67.5) direction = "upright"
        else if (angle >= 67.5 && angle <= 112.5) direction = "up"
        else if (angle >= 112.5 && angle <= 157.5) direction = "upleft"
        else if (angle <= 22.5 && angle >= -22.5) direction = "right"
        else if (angle <= -22.5 && angle >= -67.5) direction = "downright"
        else if (angle <= -67.5 && angle >= -112.5) direction = "down"
        else if (angle <= -112.5 && angle >= -157.5) direction = "downleft"
        else if (angle >= 157.5 && angle <= -157.5) direction = "left"

        //drawSC(0, "increment", direction);
    }
}

const setShow = (index, show) => {
    const wrapper = find(".wrapper");
    sc_list[index].show = show;
    if(show) {
        if (find(`#${sc_list[index].name}`) === null) render(wrapper, sc_list[index].ele);
        if (index === 1) drawSC(1,1,"none")
    }
    else {
        if (find(`#${sc_list[index].name}`) !== null) remove(wrapper, sc_list[index].ele);
    }
}

const delSC = (index) => {
    remove(wrapper, sc_list[index].ele);
    sc_list[index] = null;
}  

const drawSC = (index, frame, direction) => {
    let fram = frame;
    if (frame === "increment"){
        if (sc_list[index].timer === sc_list[index].updates_per_frames){
            fram = sc_list[index].frame + 1;
            sc_list[index].frame = fram;
            sc_list[index].timer = 1;
        }
        else {
            sc_list[index].timer += 1;
        }
    }
    if (fram === sc_list[index].frames){
        if (sc_list[index].name === "highlight") fram = 1;
        else fram = 0
        sc_list[index].frame = fram;
    }
    if (sc_list[index].timer === 1){
    sc_list[index].direction = direction;
    const draind = sc_list[index].direction_data[direction];
    sc_list[index].draw_index = draind;
    const ctx = sc_list[index].ele.getContext("2d");
    const size = sc_list[index].size;
    const img = sc_list[index].img;
    ctx.clearRect(0,0,size,size);
    ctx.drawImage(img, size*fram, size*draind, size, size, 0, 0, size,size);
    }
}

const teleport = (index, x, y) =>{
    style(sc_list[index].ele, `
        position:absolute;
        pointer-events:none;
        top: ${y}px;
        left: ${x}px;
    `);
}

const destroySC = (obj) => {
    const index = sc_list.indexOf(obj);
    if (index > -1) { // only splice array when item is found
        if (sc_list[index].name === "coin"){
            const index2 = coin_list.indexOf(obj);
            if(index2 > -1){
                coin_list.splice(index2, 1);
            }
        }
        remove(find(".wrapper"), sc_list[index].ele);
        sc_list.splice(index, 1); // 2nd parameter means remove one item only
    }
}

const initSC = (wrapper) =>{
    spriteCanvas(wrapper, "package_drone", 32, pdsrc, 500, 300, 5, true, 1)
}

const createDrone = (name, x, y) =>{
    let imgsrc;
    let modname;
    if (name === "Lightning_Rod_Drone"){
        imgsrc = lrdsrc;
        modname = "lightning_rod_drone";
    }
    else if (name === "Magnet_Drone"){
        imgsrc = mdsrc;
        modname = "magnet_drone";
    }
    else if (name === "Force-field_Drone"){
        imgsrc = ffdsrc;
        modname = "force_field_drone";
    }
    spriteCanvas(wrapper, modname, 32, imgsrc, x, y, 0, true, 1)
}

export{initSC, moveTowards ,setShow, drawSC, teleport,destroySC, spriteCanvas, sc_list, createDrone, getIndex, delSC};