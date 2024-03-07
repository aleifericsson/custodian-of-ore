import { spriteCanvas } from "../components/spritecanvas";
import { wrapper } from "./elements";
import gdsrc from "../images/gunner_drone.png"
import { addClass, findAll, remove } from "./QoL";

let enemy_list = [];

const enemy = (type, x, y) => {
    let imgsrc;
    let fireevery;
    if (type === "gunner_drone"){
        imgsrc = gdsrc;
        fireevery = 200;
    }
    
    let timeout = Math.floor(Math.random()*fireevery);

    const enemy = spriteCanvas(wrapper, type, 32, imgsrc, x, y, 5, true, 1)
    addClass(enemy, ["enemy"])
    enemy_list.push({
        ele: enemy,
        type,
        firing: false,
        x,
        y,
        fireevery,
        timeout
    });
}

const handleShots = () =>{
    enemy_list.map(enemy => {
        //settimeout to implement bursts

    });
}

const removeEnemies = () => {
    enemy_list = [];
    const enemies = findAll(".enemy");

    enemies.forEach(enemy => {remove(wrapper,enemy)});    
}

export {enemy, enemy_list, removeEnemies, handleShots};