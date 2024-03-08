import '../css/animations.css';
import '../css/fonts.css';
import pattern from "../images/pattern_102.gif"
import {render, create, addClass, remClass, find, write, style, detect, undetect, remove} from "../scripts/QoL"
import { canvas, runEverything } from '../components/canvas';
import { wrappe, miniWrapper } from '../components/wrapper';
import { debugTools } from '../components/debugTools';
import { initMinis } from '../components/miniCanvas';
import { buttonOverlay } from '../components/buttonOverlay';
import { initSC } from '../components/spritecanvas';
import { initDialogues, nextDialogue } from '../components/dialogue';
import { initInfoScreen } from '../components/infoScreen';
import { initAudios } from './sounds';
import { initShaders, rendershader } from '../components/shaders';
import { wrapper } from './elements';

const width = 640;
const height = 640;
let start_seq = 0;

const initCanvases = () => {
    style(document.body, `
        background-color: #242424;
        background-image: url("${pattern}");
        background-size: 70px;
        background-repeat: repeat;
    `)
    const rapper = wrappe();
    const backgroundCanvas = canvas(width,height,0);
    const solidBGs = canvas(width,height,1);
    render(rapper, backgroundCanvas);
    render(rapper, solidBGs);
    initSC(rapper);
    initShaders(rapper);
    console.log("commencing");
    runEverything([backgroundCanvas, solidBGs], width, height);
    const butOv = buttonOverlay(width, height)
    render(rapper, butOv);


    const start_screen = create("div");
    addClass(start_screen, ["start-screen"]);
    style(start_screen, `
        height:640px;
        width: 640px;
        position:absolute;
        background-color: black;
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
        background-color: darkslategray;
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

    return rapper;
}

const initOther = () => {
    const minirapper = miniWrapper();
    initMinis(minirapper);
    initDialogues();
    initInfoScreen();
    initAudios();

    return minirapper;
}

const toggleStart = () =>{
    if (start_seq === 3){
        remove(wrapper, find(".start-screen"));
    }
    if (start_seq === 0){  
        start_seq += 1;
        undetect(find(".start-but"), "click", toggleStart)
        remove(wrapper, find(".start-but"));
        nextDialogue();
    }
    else{
        //change background here
        
        start_seq += 1;
    }
}

const initDebug = () =>{
    const debugTool = debugTools();
    render(document.body, debugTool);
    return debugTool;
}

export {initCanvases, initOther, initDebug, toggleStart}