import { createEffect, del, explosion, good_hit, handleWindSpawn } from "../components/effects";
import { bosshp, updateBossBar, bossBar } from "../components/infoScreen";
import { sc_list, spriteCanvas } from "../components/spritecanvas";
import {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs, isElement, moveTo, getPos, checkCollision, checkCollisionReal, getPosEle} from "./QoL"
import { wrapper } from "./elements";
import { enemy } from "./enemies";
import bosssrc from "../images/boss.png"
import { wind_directions } from "./data";
import { currentFrame } from "./SCFuncs";
import { updateCutscene } from "../components/cutscene";

let bossele;
let phase = 0;
let att_1 = "heh";
let att_2 = null;
let boss_timer;
let attacks = ["fire", "missile", "drones", "charge", "evade", "lightning"];
const gun_pos = [{x: 86, y:35}, {x: 98, y: 46}, {x:106, y:56}];
const missile_pos = [{x:73,y:73}, {x:90, y:90}];
const spawn_points = [{x:86, y:60}, {x: 78, y: 50}, {x:93, y:67}]
let current_wind = "none";

const generateAttacks = () =>{
    if (phase === 1 || phase === 2){
    if (att_1 === null && att_2 === null){
        att_1 = attacks[Math.floor(Math.random()*attacks.length)];
        if (att_1 === "fire") {fireAttack(1)}
        else if (att_1 === "missile") {missileAttack(1)}
        else if (att_1 === "drones") {spawnDrones(1)}
        else if (att_1 === "charge") {chargeAttack(1)}
        else if (att_1 === "evade") {evasiveManoevers(1)}
        else if (att_1 === "lightning") {lightningAttack(1)}
        console.log(att_1);

        let num = Math.floor(Math.random()*5);
        current_wind = wind_directions[num]
    }
    if (phase === 2){
        if(att_2 === null){
            att_2 = attacks[Math.floor(Math.random()*attacks.length)];
            if (att_2 == att_1){
                att_2 = null;
            }
                
            if (att_2 === "fire") {fireAttack(2)}
            else if (att_2 === "missile") {missileAttack(2)}
            else if (att_2 === "drones") {spawnDrones(2)}
            else if (att_2 === "charge") {chargeAttack(2)}
            else if (att_2 === "evade") {evasiveManoevers(2)}
            else if (att_2 === "lightning") {lightningAttack(2)}
        }
        console.log(att_2);
    }
    }
    if (phase === 3){
        current_wind = "none";
        if (currentFrame % 3 === 0){
            const mP = getPosEle(bossele, "none");
            createEffect("explosion", mP.x+Math.random()*256, mP.y+Math.random()*256, 90*Math.floor(Math.random()*4))
        }
    }
}

const tickBoss = ()=>{
    handleHit();
    generateAttacks();
    handleWindSpawn(current_wind);
}

const handleHit =() =>{
    if (good_hit !== null){
        if (checkCollision(bossele, good_hit.ele)){
            createEffect("hit", good_hit.x, good_hit.y, 90*Math.floor(Math.random()*4))
            del(good_hit);
            good_hit = null;
            updateBossBar(bosshp-1)
        }
    }
        if (explosion !== null){
            if (checkCollision(bossele, explosion)){
                updateBossBar(bosshp-5)
                explosion = null;
            }
        }
}

const fireGuns = () =>{
    const mP = getPosEle(bossele, "none");
    gun_pos.map(pos => {
        createEffect("bullet", mP.x+(pos.x*2)-10, mP.y+((128-pos.y)*2), -90);
    })
}

const fireMissile = () =>{
    const mP = getPosEle(bossele, "none");
    missile_pos.map(pos => {
        createEffect("missile", mP.x+(pos.x*2)-10, mP.y+((128-pos.y)*2), -90-45);
    })
}

const fireAttack = (att) =>{
    fireGuns();
    setTimeout(() =>{    
        fireGuns();
    }, 400)
    setTimeout(() =>{
        fireGuns();
    }, 800)
    setTimeout(() =>{
        fireGuns();
    }, 1200)
    setTimeout(()=>{
        if (att === 2){
            att_2 = null;
        }
        else{
            att_1 = null;
        }
    }, 8000)
}

const missileAttack = (att) =>{
    setTimeout(() =>{    
        
    fireMissile();
    }, 1000)
    setTimeout(() =>{    
        
    fireMissile();
    }, 3000)
    setTimeout(()=>{
        if (att === 2){
            att_2 = null;
        }
        else{
            att_1 = null;
        }
    }, 8000)
}

const spawnDrone = () => {
    const mP = getPosEle(bossele, "none");
    const sP = spawn_points[Math.floor(Math.random()*spawn_points.length)];
    enemy("attack_drone", mP.x+(Math.random()*5+sP.x)*2, mP.y+(Math.random()*5+sP.y)*2);
}

const spawnDrones = (att) =>{
    spawnDrone()
    setTimeout(() =>{    
        spawnDrone()
    }, 2000)
    setTimeout(() =>{
        spawnDrone()
    }, 4000)
    setTimeout(()=>{
        if (att === 2){
            att_2 = null;
        }
        else{
            att_1 = null;
        }
    }, 8000)
}

const chargeAttack = (att) =>{
    
}

const evasiveManoevers = (att) =>{
    
}

const lightningAttack = (att) =>{

}

const moveBossTowards = (index, x, y, wind) => {
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

/*
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
    */

    let outta_bounds = true

    if (nx <640-64&&nx>0&&ny <640-64&&ny>0) outta_bounds = false;
    if (outta_bounds){
        //uhh
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

        //drawSC(sc_list[0], "increment", direction);
    }
}

const spawnBoss = () =>{
    const boss = spriteCanvas(wrapper, "boss", 128, bosssrc, 25, 200, 5, true, 1)
    bossele = boss;
    bossBar();
    //updateCutscene(3, true);
}

export {tickBoss, bossele, phase, spawnBoss}