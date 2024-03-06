import {render, remove, create, addClass, remClass, find, write, detect, undetect, style, attribs} from "../scripts/QoL"
import Can from "../images/can.png"
import Coin from "../images/coin.png"
import decor from "../images/decor.png"
import { backgroundChange } from "../scripts/canvMouseFuncs";
import { spriteCanvas } from "./spritecanvas";
import { displayInfo } from "./infoScreen";
import icons from "../images/icons.png"
import { tools } from "../scripts/data";

let miniList = [];

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
        const backcanv = find(".wrapper");
        let interval_list = [];
        let mousePos2;
        let size = this.size;
        let curFra = this.currentFrame;
        let index = this.index;

        const hoverFunc = (evt) => {
            if (interval_list.length === 0){
                interval_list.push(setInterval(() => {
                }, 250))
            }
        }
        const updateDrag = (evt) =>{
            evt.preventDefault();

            const rect = document.body.getBoundingClientRect();
            const rect2 = backcanv.getBoundingClientRect();
            mousePos2 = {
                x: evt.clientX - rect2.left,
                y: evt.clientY - rect2.top
            };
            mousePos = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
                    
            canv.style.top = mousePos.y -32 +"px";
            canv.style.left = mousePos.x -32 + "px";

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
        }

        const mouseUpFunc = (evt) => {
            undetect(document.body, "mousemove", updateDrag)
            undetect(backcanv, "mouseenter", hoverFunc)
            if (interval_list.length!==0){
                if(name === "coin"){
                    const coin = spriteCanvas(find(".wrapper"), "coin", 64, Coin, mousePos2.x-32, mousePos2.y-32, 0, true, 12)
                }
            }
            clearInterval(interval_list[0]);
            interval_list = [];
            const hasChild = find(`.mini-canvas.${this.name}`) != null;
            if (hasChild) {
                remove(document.body, canv);
            }
            ctx.clearRect(0,0,size,size);
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
    img.src = icons;
    const mini = new miniCanvas(name, img, icons, miniList.length)
    const miniele = mini.init();
    miniList.push(mini);
    return miniele;
}

const initMinis = (miniWrapper) => {
    
    tools.map(tool => render(miniWrapper, initMini(tool)))
    
}

export {initMinis}