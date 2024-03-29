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
import { dgpsh } from "../components/miniCanvas";

let bossele = null;
let phase = 0;
let att_1 = null;
let att_2 = null;
let boss_timer;
let attacks = ["fire", "missile", "drones", "evade", "lightning"];
const gun_pos = [{x: 86, y:35}, {x: 98, y: 46}, {x:106, y:56}];
const missile_pos = [{x:73,y:73}, {x:90, y:90}];
const spawn_points = [{x:86, y:60}, {x: 78, y: 50}, {x:93, y:67}]
let current_wind = "none";
let boss_moving = false;
let target_x = 25;
let target_y = 200;

const generateAttacks = () =>{
    if (phase === 1 || phase === 2){
    if (att_1 === null && att_2 === null){
        att_1 = attacks[Math.floor(Math.random()*attacks.length)];
        if (att_1 === "fire") {fireAttack(1)}
        else if (att_1 === "missile") {missileAttack(1)}
        else if (att_1 === "drones") {spawnDrones(1)}
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
    if (boss_moving === true && dgpsh === false){
        moveBossTowards(target_x, target_y);
    }
}

const handleHit =() =>{
    if (good_hit !== null && bossele !== null){
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
    setTimeout(() =>{    
        fireGuns();
    }, 3400)
    setTimeout(() =>{
        fireGuns();
    }, 3800)
    setTimeout(() =>{
        fireGuns();
    }, 4200)
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
    }, 10000)
}


const evasiveManoevers = (att) =>{
    fireGuns();
    boss_moving = true;
    target_y = Math.random()*375+5;
    target_x = Math.random()*150+5;
    setTimeout(() =>{    
        
        fireGuns();
        target_y = Math.random()*375+5;
        target_x = Math.random()*150+5;
    }, 1000)
    setTimeout(() =>{
        
        fireGuns();
        target_y = Math.random()*375+5;
        target_x = Math.random()*150+5;
    }, 2000)
    setTimeout(() =>{
        
        fireGuns();
        target_y = Math.random()*375+5;
        target_x = Math.random()*150+5;
    }, 3000)
    setTimeout(() =>{
        
        target_y = 200;
        target_x = 25;
    }, 4000)
    setTimeout(()=>{

        fireGuns();
        boss_moving = false;
        if (att === 2){
            att_2 = null;
        }
        else{
            att_1 = null;
        }
    }, 8000)
}

const spawnLightning = (pattern) => {
    if(pattern === 0){
        for(let i = 0; i < 10; i++){
            setTimeout(() =>{
                createEffect("lightning_warning", 7*64+32, i*64+32, 0)
            }, 100*i)

            setTimeout(() =>{
                createEffect("lightning_warning", 8*64+32, i*64+32, 0)
            }, 100*i+100)
        }
    }
    else if (pattern === 1){
        for(let i = 0; i < 10; i++){
            setTimeout(() =>{
                createEffect("lightning_warning", 5*64+32, i*64+32, 0)
                createEffect("lightning_warning", 7*64+32, i*64+32, 0)
                createEffect("lightning_warning", 9*64+32, i*64+32, 0)
            }, 100*i)
        }
    }
    else if (pattern === 2){
        for(let i = 1; i < 6; i++){
            setTimeout(() =>{
                createEffect("lightning_warning", 5*64+32, i*64+32, 0)
                createEffect("lightning_warning", 6*64+32, i*64+32, 0)
                createEffect("lightning_warning", 7*64+32, i*64+32, 0)
                createEffect("lightning_warning", 8*64+32, i*64+32, 0)
                createEffect("lightning_warning", 9*64+32, i*64+32, 0)
            }, 100*i)
        }
    }
    else if (pattern === 3){
        for(let i = 5; i < 10; i++){
            setTimeout(() =>{
                createEffect("lightning_warning", 5*64+32, i*64+32, 0)
                createEffect("lightning_warning", 6*64+32, i*64+32, 0)
                createEffect("lightning_warning", 7*64+32, i*64+32, 0)
                createEffect("lightning_warning", 8*64+32, i*64+32, 0)
                createEffect("lightning_warning", 9*64+32, i*64+32, 0)
            }, 100*i)
        }
    }
    else if (pattern === 4){
        for(let i = 0; i < 10; i++){
            setTimeout(() =>{
                createEffect("lightning_warning", (5+Math.floor(i/2))*64+32, i*64+32, 0);
                createEffect("lightning_warning", (9-Math.floor(i/2))*64+32, i*64+32, 0);
            }, 100*i)
        }
    }
}

const lightningAttack = (att) =>{
    spawnLightning(Math.floor(Math.random()*5));
    setTimeout(() =>{    
        spawnLightning(Math.floor(Math.random()*5));
        }, 3000)
        setTimeout(() =>{          
        spawnLightning(Math.floor(Math.random()*5));
        }, 6000)
        setTimeout(()=>{
            if (att === 2){
                att_2 = null;
            }
            else{
                att_1 = null;
            }
    }, 10000)
}

const moveBossTowards = (x, y) => {
    const mP = getPosEle(bossele, "none");
    const myx = x;
    const myy = y;
    const dx = myx-mP.x;
    const dy = myy-mP.y;
    const mag = Math.sqrt(dx*dx + dy*dy);
    const ux = (dx/mag)*5;
    const uy = (dy/mag)*5;
    const nx = mP.x+ux;
    const ny = mP.y+uy;
    
    if (mag > 5){
    bossele.style.left = `${nx}px`;
    bossele.style.top = `${ny}px`;
    }
}

const spawnBoss = () =>{
    const boss = spriteCanvas(wrapper, "boss", 128, bosssrc, 25, 200, 5, true, 1)
    bossele = boss;
    bossBar();
    //updateCutscene(3, true);
}

export {tickBoss, bossele, phase, spawnBoss}