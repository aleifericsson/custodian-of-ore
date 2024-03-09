import { addClass, checkCollision, create, find, findAll, remove, render, style } from "../scripts/QoL";
import effsrc from "../images/effects.png";
import { shadwrap } from "../scripts/elements";
import { moveTowards, sc_list } from "./spritecanvas";
import { wind_directions } from "../scripts/data";

let effect_list = [];

const effect = (type, x, y, rot) => {
    const eff = create("div");
    let loc;
    let fadein;
    let speed;
    let scale;
    const size = 16;
    if (type === "wind"){
        loc = 9;
        fadein = 100;
        speed = 1;
        scale = 2;
    }
    else if (type === "bullet"){
        loc = 1;
        fadein = "none";
        speed = 7;
        scale = 2;
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
    `)

    effect_list.push({
        type,
        x,
        y,
        speed,
        fadein,
        rot,
        ele: eff,
        size
    })

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
        if (checkCollision(path, effect.ele)){
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

const handleFade = (effect) => {
    if (effect.fadein === 0){
        del(effect)
    }
    else{
        if (effect.fadein !== "none"){
            effect.fadein = effect.fadein - 1;
        }
    }
}

const tickeffects = () => {
    effect_list.map(effect => {
        if (["bullet", "missile", "wind"].includes(effect.type)){
            moveEffect(effect);
        }
        handleFade(effect);
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
    else dir = direction

    let rot;

    if (dir === "down") {moveTowards(0, sc_list[0].x, 640,true); rot =0}
    else if (dir === "right") {moveTowards(0, 640, sc_list[0].y,true); rot = 270}
    else if (dir === "up") {moveTowards(0, sc_list[0].x, 0,true); rot =180}
    else if (dir === "left")  {moveTowards(0, 0, sc_list[0].y,true); rot =90}


    const rand = Math.floor(Math.random()* 22);
    if (rand === 21) {effect("wind", Math.random()* 640,Math.random()* 640, rot);}


}

export {effect, tickeffects, removeEffects, handleWindSpawn}
