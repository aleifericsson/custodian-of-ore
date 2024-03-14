import { addClass, checkCollision, checkCollisionReal, create, find, findAll, getPosEle, remove, render, style } from "../scripts/QoL";
import effsrc from "../images/effects.png";
import { lr_hitbox, magnet_hitbox, package_drone, shadwrap, wrapper } from "../scripts/elements";
import { delSC, moveTowards, sc_list, spriteCanvas } from "./spritecanvas";
import { level, wind_directions } from "../scripts/data";
import { firing } from "../scripts/enemies";
import { hp, setHealth } from "./infoScreen";
import { dgpsh } from "./miniCanvas";
import { currentFrame } from "../scripts/SCFuncs";
import { lr_di } from "../scripts/toolFuncs";
import { bossele, phase, spawnBoss } from "../scripts/bossFuncs";

let effect_list = [];
let explosion = null;
let good_hit = null;
let force_field_list = [];

const createEffect = (type, x, y, rot) => {
    const eff = create("div");
    let my = y;
    let loc;
    let fadein;
    let speed=0;
    let scale;
    const size = 16;
    let opacity = 1;
    let final_y = "none";
    if (type === "wind"){
        loc = 9;
        fadein = 100;
        speed = 1;
        scale = 2;
    }
    else if (type === "bullet"){
        loc = 1;
        fadein = "none";
        speed = 10;
        scale = 2;
    }
    else if (type === "hit"){
        loc = 2;
        fadein = 10;
        scale = 2;
    }
    else if (type === "lightning_warning"){
        loc = 10;
        fadein = 20;
        scale = 4;
        opacity = 0.5;
    }
    else if (type === "lightning_strike"){
        loc = 4;
        fadein = 7;
        speed = 0;
        scale = 4;
    }
    else if (type === "lightning_bolt"){
        loc = 3;
        fadein = 7;
        scale = 4;
    }
    else if (type === "missile"){
        loc = 0;
        fadein = "none";
        speed = 12;
        scale = 2;
    }
    else if (type === "explosion"){
        loc = 7;
        fadein = 10;
        scale = 2;
    }
    else if (type === "good_missile"){
        loc = 0;
        fadein = "none";
        speed = 15;
        scale = 2;
        final_y = y;
        my = 0;
    }
    else if (type === "good_explosion"){
        loc = 7;
        fadein = 10;
        scale = 4;
    }
    else if (type === "good_hit"){
        loc = 2;
        fadein = 10;
        scale = 4;
    }
    else if (type === "force_field"){
        loc = 12;
        scale = 4;
        fadein = "none";
    }


    addClass(eff, ["effect", type]);
    style(eff, `
        scale: ${scale};
        top: ${y}px;
        left: ${x}px;
        height: 16px;
        width: 16px;
        background: url(${effsrc}) -${16*loc}px 0;
        position:absolute;
        image-rendering: pixelated;
        transform: rotate(${rot}deg);
        opacity: ${opacity};
    `)

    const theEffect = {
        type,
        x,
        y: my,
        speed,
        fadein,
        rot,
        ele: eff,
        size,
        final_y,
    }
    effect_list.push(theEffect);
    if (type === "good_explosion") explosion = eff;
    if (type === "good_hit") {
        if (good_hit != null){
            del(good_hit);
            good_hit = null;
        }
        good_hit = theEffect;
    }
    if (type === "force_field"){
        force_field_list.push(eff)
    }

    render(shadwrap, eff)
}

const removeEffects = () =>{
    effect_list = [];
    const effects = findAll(".effect");

    effects.forEach(effect => {remove(shadwrap,effect)});    
}

const moveEffect = (effect) => {
    const x = effect.x;
    const y = effect.y;
    const angle = effect.rot + 90;
    const dx = effect.speed * Math.cos(angle*(Math.PI/180))
    const dy = effect.speed * Math.sin(angle*(Math.PI/180))
    const nx = x+dx-effect.size/2;
    const ny = y+dy-effect.size/2;


    let inpath = false
    findAll(".edge").forEach(path => {
        if (checkCollisionReal(path, effect.ele)){
            inpath = true;
        }
    })

    if(inpath){
        del(effect)
        return;
    }
    else{
        effect.x = nx+effect.size/2;
        effect.y = ny+effect.size/2;
        effect.ele.style.left = `${effect.x}px`;
        effect.ele.style.top = `${effect.y}px`;
    }
}

const getRotTowards = (x, y, ele) =>{
    const coords = getPosEle(ele, 64);
    const dx = coords.x-x;
    const dy = coords.y-y;
    let angle = Math.atan(-dy/dx);
    if(dx < 0){
        if (-dy < 0){
            angle = angle - Math.PI;
        }
        else{
            angle = angle+ Math.PI;
        }
    }
    angle = angle*(180/Math.PI)
    angle = angle - 90;
    angle = -angle;
    if (angle <= -180){
        angle = angle + 360
    }
    return angle;
}

const handleFade = (effect) => {
    if (effect.fadein === 0){
        if (effect.type === "lightning_warning"){
            if (checkCollisionReal(effect.ele, lr_hitbox)){
                if(sc_list[2] === null){
                    const lrpos = getPosEle(lr_hitbox,lr_di);
                    let reps = Math.floor((lrpos.y-64)/64);
                    for(let i = 0; i < reps+1; i++){   
                        createEffect("lightning_bolt", lrpos.x, lrpos.y-64-(64*i), 0)
                    }
                }
                else{
                    const lrpos = getPosEle(sc_list[2].ele,64);
                    let reps = Math.floor((lrpos.y-64)/64);
                    for(let i = 0; i < reps+1; i++){   
                        createEffect("lightning_bolt", lrpos.x, lrpos.y-64-(64*i), 0)
                    }
                }
            }
            else{
                createEffect("lightning_strike", effect.x, effect.y, 90*Math.floor(Math.random()*4));
                let reps = (effect.y-24)/64;
                for(let i = 0; i < reps+1; i++){   
                    createEffect("lightning_bolt", effect.x, effect.y-(64*i), 0)
                }
            }
        }
        else if (effect.type === "good_explosion") {
            explosion = null
        }
        else if (effect.type === "lightning_strike"){
            if(level === 10 && phase === 0 && bossele === null){
                spawnBoss();
            }
        }
        del(effect)
    }
    else{
        if (effect.fadein !== "none"){
            effect.fadein = effect.fadein - 1;
            if (effect.type === "lightning_warning"){
                if(effect.fadein % 4 === 0 || effect.fadein % 4 === 1){
                    effect.ele.style.background= `url(${effsrc}) -${16*11}px 0`;
                }
                else{
                    effect.ele.style.background= `url(${effsrc}) -${16*10}px 0`;
                }
            }
        }
        else{
            if (effect.type === "good_missile"){
                if (effect.y >= effect.final_y){
                    createEffect("good_explosion", effect.x, effect.y, 90*Math.floor(Math.random()*4))
                    del(effect);
                }
            }
            else if(effect.type === "force_field"){
                if (sc_list[3] === null){
                    del(effect);
                    force_field_list = [];
                }
                if (currentFrame % 8 < 4){
                    effect.ele.style.background= `url(${effsrc}) -${16*13}px 0`;
                }
                else{
                    effect.ele.style.background= `url(${effsrc}) -${16*12}px 0`;
                }
            }
        }
    }
}
const compareAngles = (sourceAngle, otherAngle) =>{
    // sourceAngle and otherAngle should be in the range -180 to 180
    let difference = otherAngle - sourceAngle;

    if(difference <= -180.0) difference += 360.0;
    if(difference > 180.0) difference -= 360.0;

    if(difference > 0.0) return -1;
    if(difference < 0.0) return 1;

    return 0;
}

const tickeffects = () => {
    effect_list.map(effect => {
        if (["bullet", "wind", "good_missile"].includes(effect.type)){
            moveEffect(effect);
        }
        else if (effect.type === "missile"){
            let pdrot;

            if(!dgpsh){
            if(checkCollisionReal(magnet_hitbox, effect.ele)){
                pdrot = getRotTowards(effect.x, effect.y, package_drone);
            }
            else{
                pdrot = getRotTowards(effect.x, effect.y, package_drone);
            }
            let comp = compareAngles(effect.rot, pdrot);
            if (comp === 1){
                effect.rot = effect.rot+3;
            }
            else if (comp === -1){
                effect.rot = effect.rot-3;
            }
            if (effect.rot > 180){
                effect.rot = effect.rot-360;
            }
            effect.ele.style.transform = `rotate(${effect.rot}deg)`;
            }
            force_field_list.map(force => {
                if (checkCollision(effect.ele, force)){
                    del(effect);
                }
            })

            moveEffect(effect);
            
        }
        handleFade(effect);
        if(firing === true){
            if (effect.type === "bullet"){
                if (checkCollision(effect.ele, package_drone)){
                    setHealth(hp-1);
                    let x=0;
                    let y=0;
                    if (effect.rot === 45){ x=16;y=-16}
                    else if (effect.rot === 45+90){ x=16;y=16}
                    else if (effect.rot === 45+180){ x=-16;y=16}
                    else if (effect.rot === 45+270){ x=-16;y=-16}
                    let pdpos = getPosEle(package_drone,64);

                    createEffect("hit", pdpos.x+x, pdpos.y+y, Math.random()*360);
                    del(effect);
                }
                
                force_field_list.map(force => {
                    if (checkCollision(effect.ele, force)){
                        del(effect);
                    }
                })
                }
            if (effect.type === "lightning_strike"){
                if (checkCollision(effect.ele, package_drone)){
                    setHealth(hp-3);
                    del(effect);
                }
            }
            if (effect.type === "missile"){
                if (checkCollision(effect.ele, package_drone)){
                    setHealth(hp-3);

                    let pdpos = getPosEle(package_drone,64);
                    createEffect("explosion", pdpos.x, pdpos.y, Math.random()*360);
                    del(effect);
                }
                if (sc_list[1] !== null){
                    if (checkCollision(effect.ele, sc_list[1].ele)){
                        let pdpos = getPosEle(magnet_hitbox,64);
                        createEffect("explosion", pdpos.x+64, pdpos.y+64, Math.random()*360);
                        del(effect);
                        delSC(1);
                        if(magnet_hitbox !== null){
                            remove(wrapper, magnet_hitbox);
                        }
                    }
                    else{
                        if (good_hit !== null){
                            if(checkCollision(good_hit.ele, effect.ele)){
                                del(effect);
                            }
                        }
                    }
                }
            }
        }
    })
}

const del = (effect) =>{
    remove(shadwrap,effect.ele);
    effect_list = effect_list.filter(function (thing) {
        return thing !== effect;
    });
}

const handleWindSpawn = (direction) => {
    let dir;
    if (direction === "random"){
        let num = Math.floor(Math.random()*4);
        dir = wind_directions[num]
    }
    else if(direction === "none"){
        const rand2 = Math.floor(Math.random()* 100);
        if (rand2 === 21) {

            const x = 64*Math.floor(Math.random()*10)+24;
            const y = 64*Math.floor(Math.random()*10)+24;
            createEffect("lightning_warning", x,y, 0);
        }
        return;
    }
    else {
        dir = direction
    }
    let rot;

    if (dir === "down") {moveTowards(0, sc_list[0].x, 640,true); rot =0}
    else if (dir === "right") {moveTowards(0, 640, sc_list[0].y,true); rot = 270}
    else if (dir === "up") {moveTowards(0, sc_list[0].x, 0,true); rot =180}
    else if (dir === "left")  {moveTowards(0, 0, sc_list[0].y,true); rot =90}


    const rand = Math.floor(Math.random()* 22);
    if (rand === 21) {createEffect("wind", Math.random()* 640,Math.random()* 640, rot);}


    if(level === 8 || level === 9 ||level === 10){
        const rand2 = Math.floor(Math.random()* 100);
        if (rand2 === 21) {

            const x = 64*Math.floor(Math.random()*10)+24;
            const y = 64*Math.floor(Math.random()*10)+24;
            createEffect("lightning_warning", x,y, 0);
        }
    }
}

export {createEffect, tickeffects, removeEffects, handleWindSpawn, explosion, getRotTowards, del, good_hit}
