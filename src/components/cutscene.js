import {render, create, addClass, hasClass, remClass, find, write, detect, style, attribs, undetect, remove} from "../scripts/QoL"
import { nextDialogue } from "./dialogue";
import cutscenes from "../images/cutscenes.png"
import { wrapper } from "../scripts/elements";

let showing = true;
let curscene = 0;
let start_seq = 0;

const initCutscenes = (rapper) =>{

    const start_screen = create("div");
    addClass(start_screen, ["cutscene"]);
    start_screen.style.visibility = showing ? "visible" : "hidden";
    style(start_screen, `
        height:320px;
        width: 320px;
        scale: 2;
        position:absolute;
        top: 160px;
        left: 160px;
        background: url(${cutscenes}) -${320*curscene}px 0px;
        image-rendering: pixelated;
        z-index: 6;
    `)

    render(rapper, start_screen);

    const start_but = create("div");
    addClass(start_but, ["start-but", "button"]);
    style(start_but, `
        width: 100px;
        height:50px;
        position:absolute;
        left: ${320-50}px;
        top: ${450}px;
        background-color: darkred;
        color: white;
        font-family: munro;
        font-size: 30px;
        padding:5px;
        padding-bottom: 0px;
        text-align: center;
        vertical-align: center;
        z-index: 7;
    `)
    write(start_but, "Start")
    detect(start_but, "click", toggleStart)
    render(rapper, start_but);
}

const updateCutscene = () =>{
    const cutscene = find(".cutscene");
    cutscene.style.visibility = showing ? "visible" : "hidden";
    cutscene.style.background = `url(${cutscenes}) -${320*curscene}px 0px`
}


const toggleStart = () =>{
    if (start_seq === 3){
        showing = false;
        updateCutscene();
        setTimeout(() => {
            nextDialogue();
        }, 1000);
    }
    if (start_seq === 0){  
        curscene =1;
        start_seq += 1;
        undetect(find(".start-but"), "click", toggleStart)
        remove(wrapper, find(".start-but"));
        nextDialogue();
        updateCutscene();
    }
    else if (start_seq === 2){
        curscene =2;
        updateCutscene();
        start_seq += 1;
    }
    else{
        //change background here
        start_seq += 1;
    }
}

const nextCutscene = () =>{

}


export {initCutscenes, toggleStart}