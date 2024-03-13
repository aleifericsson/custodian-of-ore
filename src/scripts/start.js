import '../css/animations.css';
import '../css/fonts.css';
import pattern from "../images/pattern1.png"
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
import { initCutscenes } from '../components/cutscene';

const width = 640;
const height = 640;

const initCanvases = () => {
    style(document.body, `
        background-color: #242424;
        background-image: url("${pattern}");
        background-size: 128px;
        background-repeat: repeat;
        padding: 20px;
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

    return rapper;
}

const initOther = () => {
    const minirapper = miniWrapper();
    initMinis(minirapper);
    initDialogues();
    initInfoScreen();
    initAudios();
    initCutscenes(wrapper);

    return minirapper;
}

const initDebug = () =>{
    const debugTool = debugTools();
    render(document.body, debugTool);
    return debugTool;
}

export {initCanvases, initOther, initDebug}