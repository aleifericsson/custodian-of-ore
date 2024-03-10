import { addClass, checkCollision, checkCollisionReal, create, find, findAll, getPosEle, remove, render, style } from "../scripts/QoL";
import effsrc from "../images/effects.png";
import { package_drone, shadwrap } from "../scripts/elements";
import { moveTowards, sc_list } from "./spritecanvas";
import { wind_directions } from "../scripts/data";
import { firing } from "../scripts/enemies";
import { hp, setHealth } from "./infoScreen";

let effect_list = [];

const createEffect = (type, x, y, rot) => {
    const eff = create("div");
    let loc;
    let fadein;
    let speed=0;
    let scale;
    const size = 16;
    let opacity = 1;
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

const handleFade = (effect) => {
    if (effect.fadein === 0){
        if (effect.type === "lightning_warning"){
            createEffect("lightning_strike", effect.x, effect.y, 90*Math.floor(Math.random()*4));
            let reps = (effect.y-24)/64;
            for(let i = 0; i < reps+1; i++){   
                createEffect("lightning_bolt", effect.x, effect.y-(64*i), 0)
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
    }
}

const tickeffects = () => {
    effect_list.map(effect => {
        if (["bullet", "missile", "wind"].includes(effect.type)){
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
            }
            if (effect.type === "lightning_strike"){
                if (checkCollision(effect.ele, package_drone)){
                    setHealth(hp-4);
                    del(effect);
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
    else dir = direction

    let rot;

    if (dir === "down") {moveTowards(0, sc_list[0].x, 640,true); rot =0}
    else if (dir === "right") {moveTowards(0, 640, sc_list[0].y,true); rot = 270}
    else if (dir === "up") {moveTowards(0, sc_list[0].x, 0,true); rot =180}
    else if (dir === "left")  {moveTowards(0, 0, sc_list[0].y,true); rot =90}


    const rand = Math.floor(Math.random()* 22);
    if (rand === 21) {createEffect("wind", Math.random()* 640,Math.random()* 640, rot);}

    const rand2 = Math.floor(Math.random()* 150);
    if (rand === 21) {

        const x = 64*Math.floor(Math.random()*10)+24;
        const y = 64*Math.floor(Math.random()*10)+24;
        createEffect("lightning_warning", x,y, 0);

        console.log(x, y)
    }

}

export {createEffect, tickeffects, removeEffects, handleWindSpawn}
