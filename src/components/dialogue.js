import {render, remove, create, addClass, remClass, hasClass, attribs, find, write, detect, undetect, style} from "../scripts/QoL"
import { phase } from "../scripts/bossFuncs";
import { level } from "../scripts/data";
import { loadDialogues } from "../scripts/dialoguedata";
import { playAudio } from "../scripts/sounds";
import { toggleStart, updateCutscene } from "./cutscene";
import { createEffect } from "./effects";

let currentDialogue = 0;
let dialogues = [];
let someone_speakin = true;

const nextDialogue = (code) => {
    someone_speakin = true;
    playAudio("swipe");
    if (Number.isInteger(code)){
        currentDialogue = code;
    }
    const dialogue = createDialogue(dialogues[currentDialogue]);

    if (currentDialogue === 16){
        createEffect("lightning_warning", 5*64+32,5*64+32, 0);
    }


    currentDialogue += 1;

    detect(dialogue, "click", deleteDialogue);
}

const deleteDialogue = (e) =>{
    if(currentDialogue<=3){
        toggleStart();
    }
    playAudio("swipe");
    let dialogue = e.target;
    if (!hasClass(dialogue, "dialogue")){
        dialogue = dialogue.parentNode;
        if (!hasClass(dialogue, "dialogue")){
            dialogue = dialogue.parentNode; //STROKE OF GENIUS MY GUY!!
        }
    }
    undetect(dialogue, "click", deleteDialogue);
    addClass(dialogue, ["dialogue-start-end"]);
    if (currentDialogue === 33){
        updateCutscene(6, true);
    }if (currentDialogue === 34){
        updateCutscene(7, true);
    }if (currentDialogue === 35){
        updateCutscene(8, true);
    }
    setTimeout(()=> {
        remove(find(".game"), dialogue)
        if (dialogues[currentDialogue-1].follow){
            nextDialogue();
        }
        else{
            someone_speakin = false;
            if (level === 10){
                phase = 1;
            }
        }
    }, 200);
}

const dialogueObj = (text, charname, code, charactersrc, follow, index) => {
    dialogues.push({
        text,
        code,
        charactersrc,
        follow,
        charname,
        index,
    })
}

const createDialogue = (dialogueObj) => {
    const dialogue = create("div");
        addClass(dialogue, ["dialogue", "dialogue-start-end"]);
        attribs(dialogue, ["id", "draggable"], [`dialogue-${dialogueObj.code}`, "false"])

        //make prompt index system plsprompt
        style(dialogue, `
            color:white;
            background-color: #262b44;
            border: 5px solid #5a6988;
            position:absolute;
            transition: 0.1s;
            width: 600px;
            height: 100px;
            left: calc(50% -200px);
            top: 500px;
            display:flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
            padding: 10px;
            z-index: 7;
        `);

        render(dialogue, createCharBox(dialogueObj.charactersrc, dialogueObj.index))
        render(dialogue, createText(dialogueObj.text,dialogueObj.charname));
        render(find(".game"), dialogue);

        setTimeout(()=> dialogue.classList.remove("dialogue-start-end"), 100);
        return dialogue;
}

const createCharBox = (charsrc, index) => {
    const charBox = create("div");
    addClass(charBox, ["charBox"])
    style(charBox, `
        border: 2px solid #5a6988;
        min-width: 32px;
        min-height: 32px;
        margin: 16px;
        scale: 2;
        image-rendering: pixelated;
        background: url(${charsrc}) -${32*index}px 0px;
    `)
    return(charBox);
}

const createText = (mytext,charname) =>{
    const textbox = create("div");
    const text = create("div");
    const chartext = create("div");
    style(textbox,`
        position:relative;
        top: -10px;
    `);
    style(text, `
        color:white;
        font-family: 'munro';
        font-size: 20px;
    `);
    style(chartext, `
        color:white;
        font-family: 'munro';
        font-size: 30px;
    `);

    write(text, mytext);
    write(chartext, charname);
    render(textbox, chartext);
    render(textbox, text);

    return textbox;
}

const initDialogues = () => {
    loadDialogues();
}

export {initDialogues, nextDialogue, dialogueObj, someone_speakin};