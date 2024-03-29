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
        background-color: #a22633;
        border: 5px solid #FFFFFF;
        color: white;
        font-family: munro;
        font-size: 40px;
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

const renderRefreshBut = () =>{
    const start_but = create("div");
    addClass(start_but, ["start-but", "button"]);
    style(start_but, `
        position:absolute;
        left: ${220}px;
        top: ${530}px;
        background-color: #a22633;
        color: #ffffff;
        font-family: munro;
        font-size: 30px;
        padding:5px;
        padding-bottom: 0px;
        text-align: center;
        vertical-align: center;
        z-index: 7;
    `)
    write(start_but, "Press Me to Refresh")
    detect(start_but, "click", toggleRefresh)
    render(wrapper, start_but);
}

const toggleRefresh = () =>{
    window.location.reload();
}

const updateCutscene = (cursce, show) =>{
    curscene = cursce;
    showing = show;
    const cutscene = find(".cutscene");
    cutscene.style.visibility = showing ? "visible" : "hidden";
    cutscene.style.background = `url(${cutscenes}) -${320*curscene}px 0px`
}

const fade = (time) =>{
    const fad = create("div");

    const mili = time*1000;

    addClass(fad, ["fad"]);

    style(fad, `
        transition-duration: ${time}s
        width: 100vw;
        height: 100vh;
        position: absolute;
        color: rgba(255,255,255,0);
    `)

    render(document.body, fad)

    addClass(fad, ["opaque"]);
    setTimeout(()=>{
        remClass(fad, ["opaque"]);
    }, mili)
    setTimeout(()=>{
        remove(document.body, fad);
    }, mili*2)
}


const toggleStart = () =>{
    if (start_seq === 3){
        updateCutscene(curscene, false);
        setTimeout(() => {
            nextDialogue();
        }, 1000);
    }
    if (start_seq === 0){ 
        start_seq += 1;
        undetect(find(".start-but"), "click", toggleStart)
        remove(wrapper, find(".start-but"));
        nextDialogue();
        updateCutscene(1, true);
    }
    else if (start_seq === 2){
        updateCutscene(2, true);
        start_seq += 1;
    }
    else{
        //change background here
        start_seq += 1;
    }
}


export {initCutscenes, toggleStart, updateCutscene, renderRefreshBut, fade}