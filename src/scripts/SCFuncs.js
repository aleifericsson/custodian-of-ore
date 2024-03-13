import { changeBackground } from "../components/buttonOverlay";
import { incrementScore, score } from "../components/debugTools";
import { nextDialogue } from "../components/dialogue";
import { checkHits, handleWindSpawn, tickeffects } from "../components/effects";
import { bossBar } from "../components/infoScreen";
import { destroySC, drawSC, sc_list, teleport } from "../components/spritecanvas"
import { checkCollision, checkCollisionReal, find, findAll, getPosEle, moveTo, remove } from "./QoL";
import { tickBoss } from "./bossFuncs";
import { dark_levels, level, level_start_y, wind_directions } from "./data";
import { magnet_hitbox, package_drone, shadwrap } from "./elements";
import { enemy_list, firing, tickEnemies } from "./enemies";
import { playAudio } from "./sounds";
import { handleMagnet } from "./toolFuncs";
import { trigger } from "./triggers";

let currentFrame = 0;

const animateSCs = () => {
    currentFrame += 1;
    checkCollisions();
    tickEnemies();
    if (dark_levels.includes(level)) handleWindSpawn(wind_directions[dark_levels.indexOf(level)]);
    tickeffects();

    for(let i = 0; i<4; i++){
        if (sc_list[i] !== null){
            drawSC(sc_list[i],"increment","none");
        }
    }

    if (level === 10){
        tickBoss();
    }
    
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

/*
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
*/


const checkCollisions = () =>{
    let overlap = checkCollisionReal(magnet_hitbox, package_drone);
    if (overlap) handleMagnet(package_drone);

    if(level > 0 && level<=6){
        const paths = findAll(".pathblock");
        let inpath = false
        paths.forEach(path => {
            if (checkCollision(path, package_drone)){
                inpath = true;
            }
        })
        if (inpath === false){
            paths.forEach(shad => {remove(find(".level.shader"),shad)});
            firing = true;
        }
    }
    

    if (checkCollisionReal(find(".endblock"), package_drone)) {
        if (level === 0){
            moveTo(package_drone, 600, 420, 64);
            sc_list[0].x = 570;
            sc_list[0].y = 420;
        }
        else{
            const pdpos = getPosEle(package_drone, 64);
            if (level <= 5){
                sc_list[0].y = level_start_y[level+1];
            }
            else sc_list[0].y = pdpos.y; 
            sc_list[0].x = 570;

            moveTo(package_drone,sc_list[0].x, sc_list[0].y, 64);
            
        }
        changeBackground();
    }
    //console.log(overlap);
}

export {animateSCs, currentFrame}