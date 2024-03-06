import { moveTowards } from "../components/spritecanvas";
import {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs, isElement, getPos, getCSS, getPosEle} from "./QoL"
import { magnet_hitbox } from "./elements";

const magnet_di = 200;

const handleMagnet = (attracted) => {
    const elepos = getPosEle(magnet_hitbox, magnet_di);
    
    moveTowards(0, elepos.x, elepos.y);
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
        background-color:rgba(255,255,255, 0.5);
        z-index: 5;
    `)

    magnet_hitbox = hitb;

    render(find(".wrapper"), hitb);
}

export {handleMagnet, magnethitbox}