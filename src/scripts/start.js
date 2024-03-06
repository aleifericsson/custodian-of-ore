import '../css/animations.css';
import '../css/fonts.css';
import pattern from "../images/pattern_102.gif"
import {render, create, addClass, remClass, find, write, style, detect} from "../scripts/QoL"
import { canvas, runEverything } from '../components/canvas';
import { wrapper, miniWrapper } from '../components/wrapper';
import { debugTools } from '../components/debugTools';
import { initMinis } from '../components/miniCanvas';
import { buttonOverlay } from '../components/buttonOverlay';
import { initSC } from '../components/spritecanvas';
import { initDialogues, nextDialogue } from '../components/dialogue';
import { initInfoScreen } from '../components/infoScreen';
import { initAudios } from './sounds';
import { initShaders, rendershader } from '../components/shaders';

const width = 640;
const height = 640;

const initCanvases = () => {
    style(document.body, `
        background-color: #242424;
        background-image: url("${pattern}");
        background-size: 70px;
        background-repeat: repeat;
    `)
    const rapper = wrapper();
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

const initDebug = () =>{
    const debugTool = debugTools();
    render(document.body, debugTool);
    return debugTool;
}

export {initCanvases, initOther, initDebug}