import {render, remove, create, addClass, hasclass, remClass, find, write, detect, undetect, style, attribs, moveTo, getPos} from "../scripts/QoL"
import { backgroundChange } from "../scripts/canvMouseFuncs";
import { createDrone, delSC, getIndex, sc_list, spriteCanvas } from "./spritecanvas";
import { displayInfo, hp, setHealth } from "./infoScreen";
import tools from "../images/tools.png"
import { tool_list } from "../scripts/data";
import { handleMagnet, healHitbox, lrHitbox, lr_di, magnethitbox } from "../scripts/toolFuncs";
import { heal_hitbox, lr_hitbox, magnet_hitbox, wrapper } from "../scripts/elements";
import { createEffect } from "./effects";
import { firing } from "../scripts/enemies";
import { removePaths } from "./shaders";

let miniList = [];
//let cooldown_list = [false, false, false, false, false, false, false, false];
let magazine = 20;
let dgpsh = false;
let heal_countdown = 40;

function miniCanvas(name, img, imgsrc, index){
    this.name = name;
    this.index = index;
    this.img = img;
    this.imgsrc = imgsrc;
    this.currentFrame = 0;
    this.canvele;
    this.imgele;
    this.backele;
    this.lock = null;

    this.init = () =>{
        const index = this.index;
        this.addedleft = miniList.length*64;

        const size = this.size;
        const name = this.name;
        const canv = create("canvas");
        addClass(canv, ["mini-canvas", `${name}`]);
        attribs(canv, ["width", "height"], [`${64}px`,`${64}px`]);

        style(canv, `
            position:absolute;
            margin: 5 auto;
            pointer-events:none;
        `);
        const ctx = canv.getContext("2d");
        const img = this.img;

        ctx.imageSmoothingEnabled = false;
        img.onload = function() {
            ctx.clearRect(0,0,64,64);
            ctx.drawImage(img, 16*index, 0, 16, 16, 0, 0, 64,64);
        }

        this.canvele = canv;
        this.ctx = ctx;

        const imgele = create("canvas");
        addClass(imgele, ["canvas-icon"])
        attribs(imgele, ["width", "height", "id"], [`${64}px`,`${64}px`, name]);
        style(imgele, `
        `)

        const backele = create("div");
        addClass(backele, ["backele", name])
        style(backele, `
            width: 64px;
            height: 64px;
            position:relative;
        `)

        const ctx2 = imgele.getContext("2d");
        ctx2.imageSmoothingEnabled = false;

        img.onload = function() {
            ctx2.clearRect(0,0,64,64);
            ctx2.drawImage(img, 16*index, 0, 16, 16, 0, 0, 64,64);
        }
            
        imgele.dataset.imgsrc = this.imgsrc;
        imgele.dataset.index = index;

        this.imgele = imgele;

        this.initMouse(canv, imgele);

        render(backele, imgele);
        this.backele = backele;
        return backele;
    }

    this.cooldown = (time) => {
        const backele = this.backele;
        const lock = create("div");
        addClass(lock, ["lock", name])
        style(lock, `
            width: 16px;
            height: 16px;
            scale: 4;
            top: 24px;
            left: 24px;
            image-rendering: pixelated;
            position:absolute;
            background: url(${tools}) -${16*9}px 0px;
        `)

        render(backele, lock);

        this.lock = lock;

        setTimeout(() => {
            remove(backele, lock);
            this.lock = null;
        },time)
    } 

    this.initMouse = (canv, imgele) => {
        const ctx = canv.getContext("2d");
        let mousePos;
        const backcanv = wrapper;
        let interval_list = [];
        let mousePos2;
        let size = this.size;
        let curFra = this.currentFrame;
        let index = this.index;
        let holding = false;

        const hoverFunc = (evt) => {
            holding = true;
            if (interval_list.length === 0){
                if (name === "Machine_Gun"){
                    magazine = 20;
                    interval_list.push(setInterval(() => {
                        if(magazine === 0 ){   
                            clearInterval(interval_list[0]);
                        }
                        else{
                            magazine -= 1;
                            createEffect("good_hit", mousePos2.x-24, mousePos2.y-24, 90*Math.floor(Math.random()*4))
                        }
                    }, 250))
                }
                else if (name === "Magnet_Drone"){
                    interval_list.push(setInterval(() => {
                    moveTo(magnet_hitbox, mousePos2.x, mousePos2.y, 200);
                    }, 100))
                }
                else if (name === "Lightning_Rod_Drone"){
                    interval_list.push(setInterval(() => {
                    moveTo(lr_hitbox, mousePos2.x, mousePos2.y, lr_di);
                    }, 100))
                }
                else if (name === "Repair_Package_Drone"){
                    interval_list.push(setInterval(() => {
                        moveTo(heal_hitbox, mousePos2.x, mousePos2.y, 200);
                        if (heal_countdown === 0){
                            heal_countdown = 40;
                            setHealth(hp+2);
                        }
                        else heal_countdown -= 1;
                    }, 100))
                }
            }
        }
        const updateDrag = (evt) =>{
            evt.preventDefault();

            mousePos2 = getPos(evt, backcanv)
            mousePos = getPos(evt, document.body);
            
            moveTo(canv, mousePos.x, mousePos.y, 64)

        }

        const mouseDownFunc = (evt) => {
            evt.preventDefault();  
            canv.style.top ="-1000px";
            canv.style.left = "-1000px";
            render(document.body,canv);
            detect(document.body, "mousemove", updateDrag)
            detect(backcanv, "mouseenter", hoverFunc)
            ctx.clearRect(0,0,64,64);
            ctx.drawImage(img, index*16, 0, 16, 16, 0, 0, 64,64);
            if (name === "Magnet_Drone"){
                if (magnet_hitbox !== null) {remove(wrapper, magnet_hitbox);magnet_hitbox=null}
                magnethitbox()
            }
            else{
                if (name === "Force-field_Drone") this.cooldown(15000)
                if (name === "Lightning_Rod_Drone") {
                    this.cooldown(15000)
                    lrHitbox()
                }
                if (name === "Air_Strike") {
                    firing = true;
                    removePaths();
                    this.cooldown(3000)
                }
                if (name === "Machine_Gun") {
                    this.cooldown(10000)
                    firing = true;
                    removePaths();
                }
                if (name === "Drone_GPS_Hack") {
                    this.cooldown(20000)
                    dgpsh = true
                    setTimeout(() => {dgpsh = false},10000)
                }
                if (name === "Repair_Package_Drone") {
                    healHitbox()
                    this.cooldown(20000)
                }
                if(name === "Recall_Drones"){
                    if (sc_list[1] !== null){
                        delSC(1)
                    }
                    if (sc_list[2] !== null){
                        delSC(2)
                    }
                    if (sc_list[3] !== null){
                        delSC(3)
                    }
                }
            }
            if (["Magnet_Drone", "Lightning_Rod_Drone", "Force-field_Drone"].includes(this.name)){
                if (sc_list[getIndex(this.name)] !== null){
                    delSC(getIndex(this.name))
                }
            }
        }

        const mouseUpFunc = (evt) => {
                undetect(document.body, "mousemove", updateDrag)
                undetect(backcanv, "mouseenter", hoverFunc)

                let mP = getPos(evt, backcanv);
                if (holding === true){
                    if (this.name === "Air_Strike"){
                        createEffect("good_missile", mP.x, mP.y, 0);
                    }
                    if (["Magnet_Drone", "Lightning_Rod_Drone", "Force-field_Drone"].includes(this.name)){
                        //if (sc_list[getIndex(this.name)] !== null){
                            const x = mP.x-40;
                            const y = mP.y-40;
                            const di = 4;
                            if (x <640-64&&x>0&&y<640-64&&y>0){
                                createDrone(name, x, y)
                                if (name === "Force-field_Drone"){
                                    const nx = x-10;
                                    const ny = y-10;
                                    createEffect("force_field", nx+32+di/2, ny-di, 90)
                                    createEffect("force_field", nx-di, ny+32+di/2, 0)
                                    createEffect("force_field", nx+32+di/2, ny+64+di, 90)
                                    createEffect("force_field", nx+64+di, ny+32+di/2, 0)
                                    setTimeout(()=>{delSC(3)}, 10000)
                                }
                                else if (name === "Lightning_Rod_Drone"){
                                    setTimeout(()=>{
                                        delSC(2)
                                        remove(wrapper, lr_hitbox);
                                        lr_hitbox=null
                                    }, 10000)
                                }
                            }
                        //}
                    } 
                    if (name === "Repair_Package_Drone"){
                        if (heal_hitbox !== null) {remove(wrapper, heal_hitbox);magnet_hitbox=null}
                    }
                    holding = false;
                }
                clearInterval(interval_list[0]);
                interval_list = [];
                const hasChild = find(`.mini-canvas.${this.name}`) != null;
                if (hasChild) {
                    remove(document.body, canv);
                }
                ctx.clearRect(0,0,size,size);
            
        }

        const updateInfo = (evt) =>{
            displayInfo(evt.target.id, evt.target);
        }

        detect(imgele, "mousedown", mouseDownFunc);
        detect(document.body, "mouseup", mouseUpFunc);
        detect(imgele, "mouseenter", updateInfo)
    }       
}

const initMini = (name) => {
    const img = new Image()
    img.src = tools;
    const mini = new miniCanvas(name, img, tools, miniList.length)
    const miniele = mini.init();
    miniList.push(mini);
    return miniele;
}

const initMinis = (miniWrapper) => {
    
    tool_list.map(tool => render(miniWrapper, initMini(tool)))
    
}

export {initMinis, dgpsh}