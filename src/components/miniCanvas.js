import {render, remove, create, addClass, hasclass, remClass, find, write, detect, undetect, style, attribs, moveTo, getPos} from "../scripts/QoL"
import { backgroundChange } from "../scripts/canvMouseFuncs";
import { spriteCanvas } from "./spritecanvas";
import { displayInfo } from "./infoScreen";
import tools from "../images/tools.png"
import { tool_list } from "../scripts/data";
import { handleMagnet, magnethitbox } from "../scripts/toolFuncs";
import { magnet_hitbox, wrapper } from "../scripts/elements";
import { createEffect } from "./effects";

let miniList = [];
let magazine = 20;

function miniCanvas(name, img, imgsrc, index){
    this.name = name;
    this.index = index;
    this.img = img;
    this.imgsrc = imgsrc;
    this.currentFrame = 0;
    this.canvele;
    this.imgele;

    this.init = () =>{
        const index = this.index;
        this.addedleft = miniList.length*64;

        const size = this.size;
        const name = this.name;
        const canv = create("canvas");
        addClass(canv, ["mini-canvas", `${name}`]);
        attribs(canv, ["width", "height"], [`${64}px`,`${64}px`]);

        style(canv, `
            position:absolute;
            margin: 5 auto;
            pointer-events:none;
        `);
        const ctx = canv.getContext("2d");
        const img = this.img;

        ctx.imageSmoothingEnabled = false;
        img.onload = function() {
            ctx.clearRect(0,0,64,64);
            ctx.drawImage(img, 16*index, 0, 16, 16, 0, 0, 64,64);
        }

        this.canvele = canv;
        this.ctx = ctx;

        const imgele = create("canvas");
        addClass(imgele, ["canvas-icon"])
        attribs(imgele, ["width", "height", "id"], [`${64}px`,`${64}px`, name]);
        style(imgele, `

        `)

        const ctx2 = imgele.getContext("2d");
        ctx2.imageSmoothingEnabled = false;

        img.onload = function() {
            ctx2.clearRect(0,0,64,64);
            ctx2.drawImage(img, 16*index, 0, 16, 16, 0, 0, 64,64);
        }
            
        imgele.dataset.imgsrc = this.imgsrc;
        imgele.dataset.index = index;

        this.imgele = imgele;

        this.initMouse(canv, imgele);

        return imgele;
    }

    this.initMouse = (canv, imgele) => {
        const ctx = canv.getContext("2d");
        let mousePos;
        const backcanv = wrapper;
        let interval_list = [];
        let mousePos2;
        let size = this.size;
        let curFra = this.currentFrame;
        let index = this.index;

        const hoverFunc = (evt) => {
            if (interval_list.length === 0){
                if (name === "Machine_Gun"){
                    magazine = 20;
                    interval_list.push(setInterval(() => {
                        if(magazine === 0 ){   
                            clearInterval(interval_list[0]);
                        }
                        else{
                            magazine -= 1;
                            createEffect("good_hit", mousePos2.x-24, mousePos2.y-24, 90*Math.floor(Math.random()*4))
                        }
                    }, 250))
                }
                else if (name === "Magnet_Drone"){
                    interval_list.push(setInterval(() => {
                    moveTo(magnet_hitbox, mousePos2.x, mousePos2.y, 200);
                    }, 100))
                }
            }
        }
        const updateDrag = (evt) =>{
            evt.preventDefault();

            mousePos2 = getPos(evt, backcanv)
            mousePos = getPos(evt, document.body);
            
            moveTo(canv, mousePos.x, mousePos.y, 64)

        }

        const mouseDownFunc = (evt) => {
            evt.preventDefault();  
            canv.style.top ="-1000px";
            canv.style.left = "-1000px";
            render(document.body,canv);
            detect(document.body, "mousemove", updateDrag)
            detect(backcanv, "mouseenter", hoverFunc)
            ctx.clearRect(0,0,64,64);
            ctx.drawImage(img, index*16, 0, 16, 16, 0, 0, 64,64);
            if (name === "Magnet_Drone"){
                magnethitbox()
            }
        }

        const mouseUpFunc = (evt) => {
                undetect(document.body, "mousemove", updateDrag)
                undetect(backcanv, "mouseenter", hoverFunc)

                let mP = getPos(evt, backcanv);
                if (interval_list.length!==0){
                    if(name === "coin"){
                        //const coin = spriteCanvas(find(".wrapper"), "coin", 64, Coin, mousePos2.x-32, mousePos2.y-32, 0, true, 12) spawns sc of coin
                    }
                    else if (name === "Air_Strike"){
                        createEffect("good_missile", mP.x, mP.y, 0);
                    }
                }
                clearInterval(interval_list[0]);
                interval_list = [];
                const hasChild = find(`.mini-canvas.${this.name}`) != null;
                if (hasChild) {
                    remove(document.body, canv);
                }
                ctx.clearRect(0,0,size,size);
                if (name === "Magnet_Drone" && magnet_hitbox !== null){
                    remove(wrapper, magnet_hitbox);
                }
            
        }

        const updateInfo = (evt) =>{
            displayInfo(evt.target.id, evt.target);
        }

        detect(imgele, "mousedown", mouseDownFunc);
        detect(document.body, "mouseup", mouseUpFunc);
        detect(imgele, "mouseenter", updateInfo)
    }       
}

const initMini = (name) => {
    const img = new Image()
    img.src = tools;
    const mini = new miniCanvas(name, img, tools, miniList.length)
    const miniele = mini.init();
    miniList.push(mini);
    return miniele;
}

const initMinis = (miniWrapper) => {
    
    tool_list.map(tool => render(miniWrapper, initMini(tool)))
    
}

export {initMinis}