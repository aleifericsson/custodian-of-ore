import {render, remove, create, addClass, remClass, hasClass, attribs, find, write, detect, undetect, style} from "../scripts/QoL"
import close from "../images/close.png"
import closesound from "../sounds/close.mp3"
import { playAudio } from "../scripts/sounds";

let butOv;
let currentCode = 0;
/*
    Prompt code:
    1: test_prompt
    2: win screen
    3: tutorial

*/

const togglePrompt = (e) => {
    let code = 0;
    let prompt = "";
    if (typeof e === 'string' || e instanceof String){
        if (e === "win"){
            code = 2;
            prompt = "you won!";
        }
        if (e === "tutorial"){
            code = 3;
            prompt = "welcome! how to play: find out!";
        }
    }
    else{
        if (hasClass(e.target, "closeprompt")){
            playAudio("close");
        }
        if (e.target.id === "promptbut-1" || e.target.id === "closeprompt-1"){
            code = 1;
            prompt = "you have been prompted";
        }
        else if (e.target.id === "closeprompt-2"){
            code = 2;
        }
        else if (e.target.id === "closeprompt-3"){
            code = 3;
        }
    }   
    

    const exists = find(`#prompt-${code}`);
    if (exists != null) { 
        addClass(exists, ["end-state"]);
        setTimeout(()=> remove(find(".wrapper"), exists), 200);
    } 
    else{
        createPrompt(prompt,code);
    }
}

const createPrompt = (mytext, code) => {
    const butOv = find(".button-overlay");
    const prompt = create("div");
        addClass(prompt, ["prompt", "start-state"]);
        attribs(prompt, ["id", "draggable"], [`prompt-${code}`, "false"])

        //make prompt index system pls
        style(prompt, `
            color:white;
            background-color: slategray;
            border: 5px solid darkslategray;
            position:absolute;
            transition: 0.1s;
            width: 200px;
            height: 100px;
            left: 200px;
            top: 250px;
        `);
        
        const drag = dragBar(code);
        render(prompt, drag);

        render(prompt, createText(mytext));
        render(find(".wrapper"), prompt);

        setTimeout(()=> prompt.classList.remove("start-state"), 100);
}

const createText = (mytext) =>{
    const text = create("div");
        style(text, `
            color:white;
            position:relative;
            text-align:center;
            margin:15px 5px;
            font-family: 'munro';
        `);
    write(text, mytext);

    return text;
}


const dragBar = (code) => {
    const bar = create("div");
    addClass(bar, ["bar"]);
    attribs(bar, ["id", "draggable"], [`bar-${code}`, "false"])
    style(bar, `
        display:flex;
        justify-content: flex-end;
        padding: 5px;
        background-color: darkslategray;
        height: 20px;
    `)
    

    const closePrompt = create("div");
    addClass(closePrompt, ["button", "closeprompt"]);
    closePrompt.id =   `closeprompt-${code}`;
    style(closePrompt, `
        position: absolute;
        width: 16px;
        height: 16px;
        background: url(${close});
    `);

    render(bar, closePrompt);
    detect(bar, "mousedown", mouseDown);
    detect(bar, "mouseup", mouseUp);
    //fix the issue you know what it is

    detect(closePrompt, "click", togglePrompt);

    return bar;
}

const mouseDown = (e) =>{
    const code = e.target.id.split('-')[1];
    currentCode = code;
    e.preventDefault();
    detect(document.body, "mousemove", mouseMove);
    addClass(find(`#prompt-${code}`), ["notransition"]);
}

const mouseMove = (evt) => {
    evt.preventDefault();
    const prompt = find(`#prompt-${currentCode}`);
    const rect = find(".wrapper").getBoundingClientRect();
    const mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
    
    if (prompt !== null)
    {
        prompt.style.top = mousePos.y -10 +"px";
        prompt.style.left = mousePos.x -100 + "px";
    }
}

const mouseUp = (e) =>{
    undetect(document.body,"mousemove", mouseMove);
    remClass(find(`#prompt-${currentCode}`), ["notransition"]);
    currentCode = 0;
}

const promptObj = () => {

}
export {togglePrompt};