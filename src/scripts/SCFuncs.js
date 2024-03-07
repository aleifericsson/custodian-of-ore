import { changeBackground } from "../components/buttonOverlay";
import { incrementScore, score } from "../components/debugTools";
import { destroySC, sc_list, teleport } from "../components/spritecanvas"
import { checkCollision, find, findAll, getPosEle, moveTo } from "./QoL";
import { level } from "./data";
import { magnet_hitbox, package_drone } from "./elements";
import { playAudio } from "./sounds";
import { handleMagnet } from "./toolFuncs";
import { trigger } from "./triggers";

const animateSCs = () => {
    checkCollisions();
    /*
    coin_list.forEach(coin => {
        drawObj(coin, "increment", "none");
        const overlap = checkCollision(coin, find("#car"));
        if (overlap){
            destroySC(coin);
            incrementScore();
            playAudio("coin");
            if (score === 10){
                trigger("win");
            }
        }
    })
    */
}

const drawObj = (obj, frame, direction) => {
    let fram = frame;
    if (frame === "increment"){
        if (obj.timer === obj.updates_per_frames){
            fram = obj.frame + 1;
            obj.frame = fram;
            obj.timer = 1;
        }
        else {
            obj.timer += 1;
        }
    }
    if (fram === obj.frames){
        if (obj.name === "highlight") fram = 1;
        else fram = 0
        obj.frame = fram;
    }
    if (obj.timer === 1){
        obj.direction = direction;
        const draind = obj.direction_data[direction];
        obj.draw_index = draind;
        const ctx = obj.ele.getContext("2d");
        const size = obj.size;
        const img = obj.img;
        ctx.clearRect(0,0,size,size);
        ctx.drawImage(img, size*fram, size*draind, size, size, 0, 0, size,size);
    }
}

const checkCollisions = () =>{
    let overlap = checkCollision(magnet_hitbox, package_drone);
    if (overlap) handleMagnet(package_drone);

    const paths = findAll(".pathblock");
    paths.forEach(path => {
        if (checkCollision(path, package_drone)){
            overlap = true;
        }
    })

    if (checkCollision(find(".endblock"), package_drone)) {
        if (level === 0){
            moveTo(package_drone, 600, 420, 64);
            sc_list[0].x = 600;
            sc_list[0].y = 420;
        }
        else{
            const pdpos = getPosEle(package_drone, 64);
            moveTo(package_drone, pdpos.x+580, pdpos.y, 64);
            sc_list[0].x = pdpos.x+580;
            sc_list[0].y = pdpos.y;
        }
        changeBackground();
    }
    //console.log(overlap);
}

export {animateSCs}