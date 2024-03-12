import { moveTowards } from "../components/spritecanvas";
import {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs, isElement, getPos, getCSS, getPosEle} from "./QoL"
import { heal_hitbox, magnet_hitbox } from "./elements";

const magnet_di = 200;
const heal_di = 200;

const handleMagnet = (attracted) => {
    const elepos = getPosEle(magnet_hitbox, magnet_di);
    
    moveTowards(0, elepos.x, elepos.y, false);
}

const magnethitbox = () => {
    const diameter = magnet_di;
    const hitb = create("div");
    hitb.id = "magnet_hitbox";
    style(hitb, `
        height: ${diameter}px;
        width: ${diameter}px;
        top: -1000px;
        left; -1000px;
        position: absolute;
        z-index: 5;
        pointer-events: none;
    `)
//in case of debug: background-color: rgba(255,255,255, 0.5);
    magnet_hitbox = hitb;

    render(find(".wrapper"), hitb);
}

const healHitbox = () => {
    const diameter = heal_di;
    const hitb = create("div");
    hitb.id = "heal_hitbox";
    style(hitb, `
        height: ${diameter}px;
        width: ${diameter}px;
        top: -1000px;
        left; -1000px;
        position: absolute;
        z-index: 5;
        pointer-events: none;
    `)
//in case of debug: background-color: rgba(255,255,255, 0.5);
    heal_hitbox = hitb;

    render(find(".wrapper"), hitb);
}

export {handleMagnet, magnethitbox, healHitbox}