import {render, create, addClass, remClass, find, write, detect, style, attribs} from "../scripts/QoL"
import { animateSCs } from "../scripts/SCFuncs";
import { initMouse } from "../scripts/canvMouseFuncs";
import {initBackground, updateBackground, clear} from "../scripts/canvasFuncs";

let stop = false;
let frames = 0;
const fps = 30
const msPerFrame = 1000 / fps
let msPrev = window.performance.now()

const canvas = (width, height, layer) => {
    const canv = create("canvas");
    addClass(canv, ["game-canvas", `layer-${layer}`]);
    attribs(canv, ["width", "height"], [`${width}px`,`${height}px`]);

    style(canv, `
        position:absolute;
    `);
    const ctx = canv.getContext("2d");

    initMouse(canv);
    
    if (layer===0)
    {
        initBackground(ctx, width, height);
    }

    return canv;
}

function runEverything(canvasList, width, height){
    const animateEverything = () => {

        window.requestAnimationFrame(animateEverything);

        const msNow = window.performance.now();
        const msPassed = msNow - msPrev;

        if (msPassed < msPerFrame) return

        const excessTime = msPassed % msPerFrame
        msPrev = msNow - excessTime

        // Put your drawing code here
        canvasList.map((canvas,index) => {
            const ctx = canvas.getContext("2d");
            //clear(ctx, width, height)
            frames++;
            if (index===0){
                updateBackground(ctx, width, height);
                //implement someway so that it wont update unless there is a change
            }
        });

        animateSCs();
    
    }

    animateEverything();
}



export {canvas, runEverything}