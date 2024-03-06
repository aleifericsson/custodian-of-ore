import {render, create, addClass, hasClass, remClass, find, write, detect, style, attribs} from "./QoL"
import { getTiles, modifyTile } from "./canvasFuncs";

const initMouse = (canv) => {
    detect(canv, "click", (evt) => {
        const ctx = canv.getContext("2d");
        const mousePos = getMousePos(canv, evt);
        if (hasClass(canv, "layer-1")){
            backgroundChange(ctx, mousePos)
        }
    });
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

const backgroundChange = (ctx, mouse) => {
    const tilex = Math.floor(mouse.x/64)
    const tiley = Math.floor(mouse.y/64)

    let tiles = getTiles();
    let tile = tiles[tilex][tiley];
    tile++;
    if (tile==20){
        tile = 0;
    }
    modifyTile(tilex,tiley,tile);
}

export {initMouse, getMousePos, backgroundChange};