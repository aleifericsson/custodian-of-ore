import { addClass, create, find, findAll, remove, render, style } from "../scripts/QoL";
import effsrc from "../images/effects.png";
import { shadwrap } from "../scripts/elements";

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
        rot
    })

    render(shadwrap, eff)
}

const removeEffects = () =>{
    effect_list = [];
    const effects = findAll(".effect");

    effects.forEach(effect => {remove(shadwrap,effect)});    
}

const tickeffects = () => {
    effect_list.map(effect => {

    })
}

export {effect, tickeffects, removeEffects}
