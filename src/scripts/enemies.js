import { spriteCanvas } from "../components/spritecanvas";
import { wrapper } from "./elements";
import gdsrc from "../images/gunner_drone.png"
import mdsrc from "../images/missile_drone.png"
import adsrc from "../images/attack_drone.png"
import { addClass, findAll, remove } from "./QoL";

let enemy_list = [];

const enemy = (type, x, y) => {
    let imgsrc;
    let fireevery;
    if (type === "gunner_drone"){
        imgsrc = gdsrc;
        fireevery = 200;
    }

    if (type === "missile_drone"){
        imgsrc = mdsrc;
        fireevery = 400;
    }
    
    
    if (type === "attack_drone"){
        imgsrc = adsrc;
        fireevery = 500; //fires a prompt, but will try to ram into pd if firing is true
    }

    let timer = Math.floor(Math.random()*fireevery);

    const enemy = spriteCanvas(wrapper, type, 32, imgsrc, x, y, 5, true, 1)
    addClass(enemy, ["enemy"])
    enemy_list.push({
        ele: enemy,
        type,
        firing: false,
        x,
        y,
        fireevery,
        timer,
        timeout: null,
    });
}

const handleShots = () =>{
    enemy_list.map(enemy => {
        //settimeout to implement bursts if gunner drone

    });
}

const removeEnemies = () => {
    enemy_list = [];
    const enemies = findAll(".enemy");

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
        enemy("gunner_drone", 150, 500);
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
        enemy("gunner_drone", Math.random()*500+50, Math.random()*500+50);
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

export {enemy, enemy_list, removeEnemies, handleShots, spawnEnemies};