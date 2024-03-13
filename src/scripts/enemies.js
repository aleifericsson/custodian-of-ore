import { delSC, drawSC, moveTowards, sc_list, spriteCanvas, teleport, updateInfo } from "../components/spritecanvas";
import { package_drone, wrapper } from "./elements";
import gdsrc from "../images/gunner_drone.png"
import mdsrc from "../images/missile_drone.png"
import adsrc from "../images/attack_drone.png"
import { addClass, checkCollision, checkCollisionReal, create, find, findAll, getPosEle, moveTo, remove, undetect } from "./QoL";
import { createEffect, explosion, getRotTowards, good_hit, del } from "../components/effects";
import { hp, setHealth } from "../components/infoScreen";
import { dgpsh } from "../components/miniCanvas";
import { currentFrame } from "./SCFuncs";

let enemy_list = [];
let firing = false;

const enemy = (type, x, y) => {
    let imgsrc;
    let fireevery;
    const size = 64;
    let speed = 5;
    if (type === "gunner_drone"){
        imgsrc = gdsrc;
        fireevery = 150;
    }

    if (type === "missile_drone"){
        imgsrc = mdsrc;
        fireevery = 300;
    }
    
    
    if (type === "attack_drone"){
        imgsrc = adsrc;
        fireevery = 6; //deals damage every 4
        speed = 2;
    }

    let img;
    if (imgsrc === "none"){
        img = "none";
    }
    else{
        img = new Image();
        img.src = imgsrc;
    }

    let firetimer = Math.floor(Math.random()*(fireevery)*0.5);
    let rot = Math.random() *360;

    const enemy = spriteCanvas(wrapper, type, 32, imgsrc, x, y, 5, true, 6)
    addClass(enemy, ["enemy"])
    enemy_list.push({
        ele: enemy,
        type,
        x,
        y,
        img,
        fireevery,
        firetimer,
        timeout: null,
        size,
        moving: false,
        moveTimer: 10,
        speed,
        rot,
        direction_data: {"none":0},
        draw_index: 0,
        frame:0,
        show:true,
        frames:6,
        updates_per_frames: 4,
        timer: 1,
        hp: 5,
    });
}

const tickEnemies = () =>{
    enemy_list.map(enemy => {
        if (firing === true){
            handleFire(enemy)
            handleDGPSH(enemy)
            handleHit(enemy)
        }
    drawSC(enemy,"increment","none");
    });
}

const handleHit = (enemy) => {
    if (good_hit !== null){
        if (checkCollisionReal(enemy.ele, good_hit.ele)){
            createEffect("hit", good_hit.x, good_hit.y, 90*Math.floor(Math.random()*4))
            del(good_hit);
            good_hit = null;
            enemy.hp = enemy.hp -1;
            if (enemy.hp === 0){
                createEffect("explosion", enemy.x+16, enemy.y+16, 90*Math.floor(Math.random()*4))
                delEne(enemy);
            }
        }
    }
    if (enemy.type === "attack_drone"){
        if (sc_list[3] !== null){
            if (checkCollision(enemy.ele, sc_list[3].ele)){
                createEffect("explosion", sc_list[3].x+16, sc_list[3].y+16, 90*Math.floor(Math.random()*4))
                delSC(3);
            }
        }
    }
}

const handleDGPSH = (enemy) =>{
    if(!dgpsh){
        if (enemy.moving === true){
            if (enemy.moveTimer === 0){
                enemy.moveTimer = 10;
                enemy.moving = false;
                enemy.rot = Math.random() *360;
            }
            else{
                enemy.moveTimer = enemy.moveTimer - 1;
                moveEneTowards(enemy, enemy.rot);
            }
        }
        if(enemy.type === "attack_drone"){
            moveEneTowards(enemy, getRotTowards(enemy.x,enemy.y,package_drone)+180);
        }
        }
}

const handleFire = (enemy) =>{
    if (explosion !== null){
        if (checkCollisionReal(explosion, enemy.ele)) delEne(enemy)
    }
    if (enemy.firetimer ===0){
        enemy.firetimer = enemy.fireevery
        const x = enemy.x+32;
        const y = enemy.y+32;
        if (enemy.type === "gunner_drone"){
            gunnerShot(x,y)
            setTimeout(() =>{
                gunnerShot(x,y)
            }, 200)
            setTimeout(() =>{
                gunnerShot(x,y)
            }, 400)
            setTimeout(()=>{
                enemy.moving = true;
            }, 1000)
        }
        if (enemy.type === "missile_drone"){
            createEffect("missile", x, y, 180);
            setTimeout(()=>{
                enemy.moving = true;
            }, 1000)
        } 
        if (enemy.type === "attack_drone"){
            if(currentFrame % 2 === 0)
            {
                if (checkCollisionReal(enemy.ele, package_drone)){
                    setHealth(hp-1)
                }
            }
        }
    }
    else{
        enemy.firetimer = enemy.firetimer-1;
    }
}


const moveEneTowards = (enemy, rot) => {
    const x = enemy.x;
    const y = enemy.y;
    const angle = rot + 90;
    const dx = enemy.speed * Math.cos(angle*(Math.PI/180))
    const dy = enemy.speed * Math.sin(angle*(Math.PI/180))
    const nx = x+dx-enemy.size/2;
    const ny = y+dy-enemy.size/2;

    /*
    let inpath = false
    findAll(".edge").forEach(path => {
        if (checkCollisionReal(path, enemy.ele)){
            inpath = true;
        }
    })

    if (inpath){
        inpath = false;
        if (checkCollisionReal(find(".edge.left"), enemy.ele)) {moveTo(enemy.ele, 32, enemy.y, enemy.size);enemy.x =32}
        if (checkCollisionReal(find(".edge.right"), enemy.ele)) {moveTo(enemy.ele, 608, enemy.y, enemy.size);enemy.x =608}
        if (checkCollisionReal(find(".edge.top"), enemy.ele)) {moveTo(enemy.ele, enemy.x, 32, enemy.size);enemy.y=32}
        if (checkCollisionReal(find(".edge.bottom"), enemy.ele)) {moveTo(enemy.ele, enemy.x, 608, enemy.size);enemy.y =608}
        */


    let outta_bounds = true

    if (nx <640-64&&nx>0&&ny <640-64&&ny>0) outta_bounds = false;
    if (outta_bounds){
        //uhh
    }
    else{
        enemy.x = nx+enemy.size/2;
        enemy.y = ny+enemy.size/2;
        enemy.ele.style.left = `${enemy.x}px`;
        enemy.ele.style.top = `${enemy.y}px`;
    }
}

const delEne = (enemy) =>{
    remove(wrapper,enemy.ele);
    undetect(enemy.ele, "mouseenter", updateInfo);
    enemy_list = enemy_list.filter(function (thing) {
        return thing !== enemy;
    });
}

const gunnerShot = (x,y) =>{
    createEffect("bullet", x,y, 45);
    createEffect("bullet",x,y, 45+90);
    createEffect("bullet", x,y, 45+180);
    createEffect("bullet", x,y, 45+270);
}

const removeEnemies = () => {
    enemy_list = [];
    const enemies = findAll(".enemy");
    //remove timeouts for shotlists and stuff

    enemies.forEach(enemy => {
        remove(wrapper,enemy);
        undetect(enemy, "mouseenter", updateInfo);
    });    
}

const spawnEnemies = (level) =>{
    removeEnemies();
    if (level === "level-1"){
        enemy("gunner_drone", 70, 450);
        enemy("gunner_drone", 100, 50);
    }
    else if (level === "level-2"){
        enemy("gunner_drone", 150, 450);
        enemy("gunner_drone", 100, 100);
    }
    else if (level === "level-3"){
        enemy("gunner_drone", 50, 50);
        enemy("gunner_drone", 70, 400);
        enemy("gunner_drone", 300, 400);
    }
    else if (level === "level-4"){
        enemy("gunner_drone", 50, 50);
        enemy("gunner_drone", 200, 500);
        enemy("gunner_drone", 200, 200);
    }
    else if (level === "level-5"){
        enemy("missile_drone", 150, 400);
        enemy("gunner_drone", 200, 350);
        enemy("gunner_drone", 300, 500);
        enemy("gunner_drone", 500, 550);
    }

    else if (level === "level-6"){
        enemy("gunner_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("gunner_drone",50, 300);
        enemy("gunner_drone", 100, Math.random()*500+50);
        enemy("missile_drone", 400, 400);
        //enemy("missile_drone", Math.random()*500+50, Math.random()*500+50);
    }
    else if(level === "level-7"){
        enemy("gunner_drone", Math.random()*500+50, 300);
        enemy("gunner_drone", 200, Math.random()*500+50);
        enemy("gunner_drone", Math.random()*300+300, Math.random()*500+50);
        enemy("missile_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("attack_drone", 320, Math.random()*200+220);
    }
    else if(level === "level-8"){
        enemy("gunner_drone", 500, Math.random()*500+50);
        enemy("gunner_drone", Math.random()*500+50, 500);
        enemy("missile_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("attack_drone", 250, Math.random()*200+20);
        enemy("attack_drone", 450, Math.random()*200+420);
    }
    else if(level === "level-9"){
        enemy("gunner_drone", 100, 100);
        enemy("gunner_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("missile_drone", Math.random()*200+50, Math.random()*200+50);
        enemy("missile_drone", Math.random()*300+250, Math.random()*300+250);
        enemy("attack_drone", 150, Math.random()*200+220);
        enemy("attack_drone", 350, Math.random()*200+220);
    }
}

export {enemy, enemy_list, removeEnemies, tickEnemies, spawnEnemies, firing};