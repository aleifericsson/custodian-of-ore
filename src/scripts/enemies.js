import { moveTowards, spriteCanvas, teleport } from "../components/spritecanvas";
import { wrapper } from "./elements";
import gdsrc from "../images/gunner_drone.png"
import mdsrc from "../images/missile_drone.png"
import adsrc from "../images/attack_drone.png"
import { addClass, checkCollision, find, findAll, moveTo, remove } from "./QoL";
import { effect } from "../components/effects";

let enemy_list = [];
let firing = false;

const enemy = (type, x, y) => {
    let imgsrc;
    let fireevery;
    const size = 64;
    const speed = 5;
    if (type === "gunner_drone"){
        imgsrc = gdsrc;
        fireevery = 75;
    }

    if (type === "missile_drone"){
        imgsrc = mdsrc;
        fireevery = 150;
    }
    
    
    if (type === "attack_drone"){
        imgsrc = adsrc;
        fireevery = 500; //fires a prompt, but will try to ram into pd if firing is true
    }

    let timer = Math.floor(Math.random()*(fireevery)*0.5);
    let rot = Math.random() *360;

    const enemy = spriteCanvas(wrapper, type, 32, imgsrc, x, y, 5, true, 1)
    addClass(enemy, ["enemy"])
    enemy_list.push({
        ele: enemy,
        type,
        x,
        y,
        fireevery,
        timer,
        timeout: null,
        size,
        moving: false,
        moveTimer: 10,
        speed,
        rot,
    });
}

const handleShotSpawn = () =>{
    if (firing === true){
        enemy_list.map(enemy => {
            //settimeout to implement bursts if gunner drone
            if (enemy.timer ===0){
                enemy.timer = enemy.fireevery
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
            }
            else{
                enemy.timer = enemy.timer-1;
            }
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
        });
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


    let inpath = false
    findAll(".edge").forEach(path => {
        if (checkCollision(path, enemy.ele)){
            inpath = true;
        }
    })

    if (inpath){
        inpath = false;
        if (checkCollision(find(".edge.left"), enemy.ele)) {moveTo(enemy.ele, 6, enemy.y, enemy.size);enemy.x =6}
        if (checkCollision(find(".edge.right"), enemy.ele)) {moveTo(enemy.ele, 634, enemy.y, enemy.size);enemy.x =634}
        if (checkCollision(find(".edge.top"), enemy.ele)) {moveTo(enemy.ele, enemy.x, 6, enemy.size);enemy.y=6}
        if (checkCollision(find(".edge.bottom"), enemy.ele)) {moveTo(enemy.ele, enemy.x, 634, enemy.size);enemy.y =634}
    }
    else{
        enemy.x = nx+enemy.size/2;
        enemy.y = ny+enemy.size/2;
        enemy.ele.style.left = `${enemy.x}px`;
        enemy.ele.style.top = `${enemy.y}px`;
    }
}

const del = (enemy) =>{
    remove(wrapper,enemy.ele);
    enemy_list = enemy_list.filter(function (thing) {
        return thing !== enemy;
    });
}

const gunnerShot = (x,y) =>{
    effect("bullet", x,y, 45);
    effect("bullet",x,y, 45+90);
    effect("bullet", x,y, 45+180);
    effect("bullet", x,y, 45+270);
}

const removeEnemies = () => {
    enemy_list = [];
    const enemies = findAll(".enemy");
    //remove timeouts for shotlists and stuff

    enemies.forEach(enemy => {remove(wrapper,enemy)});    
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
        enemy("missile_drone", 400, 400);
        enemy("gunner_drone", 200, 200);
    }
    else if (level === "level-5"){
        enemy("missile_drone", 150, 500);
        enemy("gunner_drone", 200, 350);
        enemy("gunner_drone", 300, 500);
        enemy("missile_drone", 70, 70);
        enemy("gunner_drone", 500, 550);
    }

    else if (level === "level-6"){
        enemy("gunner_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("gunner_drone",50, 300);
        enemy("gunner_drone", 100, Math.random()*500+50);
        enemy("missile_drone", 400, 400);
        enemy("missile_drone", Math.random()*500+50, Math.random()*500+50);
    }
    else if(level === "level-7"){
        enemy("gunner_drone", Math.random()*500+50, 300);
        enemy("gunner_drone", 200, Math.random()*500+50);
        enemy("gunner_drone", Math.random()*300+300, Math.random()*500+50);
        enemy("missile_drone", 400, Math.random()*500+50);
        enemy("missile_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("attack_drone", 320, Math.random()*200+220);
    }
    else if(level === "level-8"){
        enemy("gunner_drone", Math.random()*500+50, 300);
        enemy("gunner_drone", 500, Math.random()*500+50);
        enemy("gunner_drone", Math.random()*500+50, 500);
        enemy("missile_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("missile_drone", 100, Math.random()*500+50);
        enemy("missile_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("attack_drone", 250, Math.random()*200+20);
        enemy("attack_drone", 450, Math.random()*200+420);
    }
    else if(level === "level-9"){
        enemy("gunner_drone", 100, 100);
        enemy("gunner_drone", Math.random()*500+50, 320);
        enemy("gunner_drone", Math.random()*500+50, Math.random()*500+50);
        enemy("missile_drone", Math.random()*500+50, 550);
        enemy("missile_drone", Math.random()*500+50, 150);
        enemy("missile_drone", Math.random()*200+50, Math.random()*200+50);
        enemy("missile_drone", Math.random()*300+250, Math.random()*300+250);
        enemy("attack_drone", 150, Math.random()*200+220);
        enemy("attack_drone", 350, Math.random()*200+220);
        enemy("attack_drone", 450, 150);
    }
}

export {enemy, enemy_list, removeEnemies, handleShotSpawn, spawnEnemies, firing};