import {render, remove, create, addClass, remClass, find, write, detect, undetect, style, hasClass} from "../scripts/QoL"
import buttons from "../images/Buttons_updated.png"
import { togglePrompt } from "./prompts";
import {destroySC, drawSC, moveTowards, setShow, teleport } from "./spritecanvas";
import { renderShader, removeShaders, renderLevel } from "./shaders";
import { dark_levels, level } from "../scripts/data";

const butSize = 32;
let butOv;
let pointer = false;
let pointTime = [];

const buttonOverlay = (width, height) =>{
    butOv = create("div");
    addClass(butOv, ['button-overlay']);
    style(butOv, `
        min-height: ${height};
        min-width: ${width};
        position: absolute;
    `)

    generateButtons(butOv);

    return butOv;
}

const generateButtons = (butOv) => {
    render(butOv, Button("changebg", 8, changeBackground, 16, 16))
}

const Button = (name, spritenum, func, x, y) =>{
    const button = create("div");
    addClass(button, ["button", name]);
    button.id = name;
        style(button, `
            position: absolute;
            left:${x}px;
            top: ${y}px;
            width: ${butSize}px;
            height: ${butSize}px;
            background: url(${buttons}) -${spritenum*butSize}px 0;
        `);

    detect(button, "click", func);
    
    return button;
}

/*
const togglePointer = (evt) => {
    const but = find("#pointer")
    const canv = find(".layer-0")
    const rect = canv.getBoundingClientRect();
    let mousePos = {x:0,y:0};

    const updatePointer = (evt) =>{
        
        mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    updatePointer(evt);

    if (pointer){
        pointer = false;
        remClass(but, ["selected"]);
        clearInterval(pointTime[0]);
        pointTime = [];
        undetect(document,"mousemove", updatePointer);
        setShow(1, false);
    }
    else{
        pointer = true;
        addClass(but, ["selected"])
        detect(document.body,"mousemove", updatePointer);

        pointTime.push(setInterval(() => {
            
            moveTowards(0, mousePos.x,mousePos.y);
            drawSC(1,"increment","none");
            teleport(1,Math.floor(mousePos.x/64)*64, Math.floor(mousePos.y/64)*64);
        }, 50));
        setShow(1, true);
    }
}
*/

const changeBackground = () => {
    removeShaders();
    level += 1;
        write(find("#level"), `Level: ${level}`)
        renderLevel(`level-${level}`)
        if (dark_levels.includes(level)){
            renderShader("dark-shader");
        }
        else{   
            renderShader("light-shader");
        }
        if (level === 10) {
            level = 0;
        }
    
    /*
    const canv = find(".layer-1");
    const ctx = canv.getContext("2d");
    const size = 160;
    if (bg !== -1){
        const img = new Image();
        img.src = background;
        img.onload = function() {
            ctx.drawImage(img, 160*bg, 0, size, size, 0, 0, 640,640);
        }
    }
    else ctx.clearRect(0,0,640,640);
    */
}

export {buttonOverlay, changeBackground}