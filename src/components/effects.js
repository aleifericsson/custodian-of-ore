import { addClass, create, find, findAll, remove, render, style } from "../scripts/QoL";
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
    if (type === "wind"){
        loc = 9;
        fadein = 200;
        speed = 2;
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
        ele: eff
    })

    render(shadwrap, eff)
}

const removeEffects = () =>{
    effect_list = [];
    const effects = findAll(".effect");

    effects.forEach(effect => {remove(shadwrap,effect)});    
}

const moveEffect = (effect) => {

}

const tickeffects = () => {
    effect_list.map(effect => {
        moveEffect(effect);
    })
}

const handleWind = (direction) => {
    let dir;
    if (direction === "random"){
        let num = Math.floor(Math.random()*4);
        dir = wind_directions[num]
    }
    else dir = direction

    let rot;

    if (dir === "down") {moveTowards(0, sc_list[0].x, 640,true); rot =0}
    else if (dir === "right") {moveTowards(0, 640, sc_list[0].y,true); rot =270}
    else if (dir === "up") {moveTowards(0, sc_list[0].x, 0,true); rot =180}
    else if (dir === "left")  {moveTowards(0, 0, sc_list[0].y,true); rot =90}


    const rand = Math.floor(Math.random()* 25);
    if (rand === 21) {effect("wind", Math.random()* 640,Math.random()* 640, dir);}


}

export {effect, tickeffects, removeEffects, handleWind}
