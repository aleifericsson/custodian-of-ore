import {render, remove, create, addClass, remClass, find, write, detect, undetect, style, attribs} from "../scripts/QoL"
import Can from "../images/can.png"
import Coin from "../images/coin.png"
import decor from "../images/decor.png"
import { backgroundChange } from "../scripts/canvMouseFuncs";
import { spriteCanvas } from "./spritecanvas";
import { displayInfo } from "./infoScreen";

let miniList = [];

function miniCanvas(name, img, imgsrc){
    this.name = name;
    this.size = 64;
    this.img = img;
    this.imgsrc = imgsrc;
    this.currentFrame = 0;
    this.canvele;
    this.imgele;

    this.init = (index) =>{
        this.addedleft = miniList.length*64;

        const size = this.size;
        const name = this.name;
        const canv = create("canvas");
        addClass(canv, ["mini-canvas", `${name}`]);
        attribs(canv, ["width", "height"], [`${size}px`,`${size}px`]);


        style(canv, `
            position:absolute;
            margin: 5 auto;
            pointer-events:none;
        `);
        const ctx = canv.getContext("2d");
        const img = this.img;
        img.onload = function() {
            ctx.clearRect(0,0,size,size);
            ctx.drawImage(img, 0, 0, size, size, 0, 0, size,size);
        }

        this.canvele = canv;
        this.ctx = ctx;

        const imgele = create("div");
        addClass(imgele, ["canvas-icon"])
        imgele.id = name;
        style(imgele, `
            width: 64px;
            height: 64px;
            background: url(${this.imgsrc}) -64px 0, url(${decor});
        `)
        imgele.dataset.imgsrc = this.imgsrc;

        this.imgele = imgele;

        this.initMouse(canv, imgele);

        return imgele;
    }

    this.initMouse = (canv, imgele) => {
        const ctx = canv.getContext("2d");
        let mousePos;
        const backcanv = find(".layer-1");
        let interval_list = [];
        let mousePos2;
        let size = this.size;
        let curFra = this.currentFrame;

        const hoverFunc = (evt) => {
            if (interval_list.length === 0){
                interval_list.push(setInterval(() => {
                    curFra += 1;
                    if (this.name === "can"){
                        backgroundChange(ctx, mousePos2);
                        if(curFra === 14){
                            curFra = 10
                        }
                    }
                    if(this.name === "coin"){
                        if(curFra === 12){
                            curFra = 0;
                        }
                    }
                    const img = this.img;
                    ctx.clearRect(0,0,size,size);
                    ctx.drawImage(img, curFra*size, 0, size, size, 0, 0, size,size);
                    this.currentFrame = curFra;
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
            let curFra = this.currentFrame;
            evt.preventDefault();  
            canv.style.top ="-1000px";
            canv.style.left = "-1000px";
            render(document.body,canv);
            detect(document.body, "mousemove", updateDrag)
            detect(backcanv, "mouseenter", hoverFunc)
            ctx.clearRect(0,0,size,size);
            ctx.drawImage(img, curFra*size, 0, size, size, 0, 0, size,size);
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

const initMini = (name, imgsrc) => {
    const img = new Image()
    img.src = imgsrc;
    const mini = new miniCanvas(name, img, imgsrc)
    const miniele = mini.init(miniList.length);
    miniList.push(mini);
    return miniele;
}

const initMinis = (miniWrapper) => {
    render(miniWrapper, initMini("can", Can))
    render(miniWrapper, initMini("coin", Coin))
}

export {initMinis}