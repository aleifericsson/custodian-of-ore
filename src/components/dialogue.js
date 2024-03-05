import {render, remove, create, addClass, remClass, hasClass, attribs, find, write, detect, undetect, style} from "../scripts/QoL"
import shadow from "../images/shad.png"
import { playAudio } from "../scripts/sounds";

let currentDialogue = 0;
let dialogues = [];

const nextDialogue = (code) => {
    playAudio("swipe");
    if (Number.isInteger(code)){
        currentDialogue = code;
    }
    const dialogue = createDialogue(dialogues[currentDialogue]);
    currentDialogue += 1;
    detect(dialogue, "click", deleteDialogue);
}

const deleteDialogue = (e) =>{
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
    setTimeout(()=> {
        remove(find(".game"), dialogue)
        if (dialogues[currentDialogue-1].follow){
            nextDialogue();
        }
    }, 200);
}

const dialogueObj = (text, charname, code, charactersrc, follow) => {
    dialogues.push({
        text,
        code,
        charactersrc,
        follow,
        charname
    })
}

const createDialogue = (dialogueObj) => {
    const dialogue = create("div");
        addClass(dialogue, ["dialogue", "dialogue-start-end"]);
        attribs(dialogue, ["id", "draggable"], [`dialogue-${dialogueObj.code}`, "false"])

        //make prompt index system plsprompt
        style(dialogue, `
            color:white;
            background-color: slategray;
            border: 5px solid darkslategray;
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
        `);

        render(dialogue, createCharBox(dialogueObj.charactersrc))
        render(dialogue, createText(dialogueObj.text,dialogueObj.charname));
        render(find(".game"), dialogue);

        setTimeout(()=> dialogue.classList.remove("dialogue-start-end"), 100);
        return dialogue;
}

const createCharBox = (charsrc) => {
    const charBox = create("div");
    addClass(charBox, ["charBox"])
    style(charBox, `
        border: 5px solid darkslategray;
        width: 64px;
        height: 64px;
        background: url(${charsrc}) 0 0;
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
    dialogueObj("man", "shadow",0, shadow, true);
    dialogueObj("life can be tough", "shadow",1, shadow, false);
    dialogueObj("you aint half bad bro", "shadow", 2, shadow, false);
}

export {initDialogues, nextDialogue};