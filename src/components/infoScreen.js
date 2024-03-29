import {render, remove, create, addClass, hasClass, remClass, find, write, detect, undetect, style, attribs, isElement} from "../scripts/QoL"
import { descriptions } from "../scripts/data";
import { wrapper } from "../scripts/elements";
import toolsrc from "../images/tools.png"
import { renderRefreshBut, updateCutscene } from "./cutscene";
import { removeEffects } from "./effects";
import { removeEnemies } from "../scripts/enemies";
import { phase } from "../scripts/bossFuncs";
import { nextDialogue } from "./dialogue";

let hp = 25;
let bosshp = 100;

const initInfoScreen = () =>{
    const info = create("div");
    addClass(info, ["infoScreen"]);
    style(info, `
        width: 250px;
        height: 640px;
        background-color: #181425;
        border: 5px solid #8b9bb4;
        position: absolute;
        left: 650px;
        top:-5px;
        color:white;
        font-family:munro;
        display: flex;
        flex-direction: column;
    `)

    render(info, infoTop());
    render(info, infoBottom());
    render(info, infoBoxText());
    render(wrapper, healthBar());
    render(wrapper, info);
}

const infoBoxText = () =>{
    const text = create("div");
    style(text,`
        position:relative;
        background-color: #181425;
        border: 5px solid #8b9bb4;
        border-top: none;
        position: absolute;
        top: 640px;
        left: -5px;
        height:30px;
        font-size: 30px;
        padding: 5px;
        text-align:center;
        color: white;
        font-family: munro;
    `)
    write(text, "Info Box");

    return text;
}

const infoTop = () =>{
    const info = create("div");
    addClass(info, ["infoTop"]);
    style(info, `
        padding: 5px;
        position:relative;
        font-family:munro;
        color:white;
        color:#5a6988;
    `)
    write(info, "(Hover over things to display information about them)")

    return(info);
}

const infoBottom = () =>{
    const info = create("div");
    addClass(info, ["infoBottom"]);
    style(info, `
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        flex-grow: 1;
        position:relative;
    `)

    const level = create("h1")
    level.id = "level";
    style(level,`
        color:#3a4466;
        align-self: right;
        font-size: 30px;
        font-family:munro;
        position: relative;
        top: 22px;
        left: 147px;
    `)

    write(level, `Level: ${0}`)
    render(info, level);

    return(info);
}

const healthBar = () => {
    const health = create("div");
    const width = 32;
    addClass(health, ["healthbar"]);
    style(health, `
        width: ${width}px;
        height: 640px;
        background-color: #181425;
        border: 5px solid #8b9bb4;
        position: absolute;
        left: -${width+20}px;
        top:-5px;
        color:white;
        font-family:munro;
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
    `)

    setHealth(health);

    
    render(health, makeIcon());
    render(health, healthText());

    return health;
}


const healthText = () =>{
    const icon = create("div");
    style(icon, `
    position:relative;
    background-color: #181425;
    border: 5px solid #8b9bb4;
    border-bottom: none;
    position: absolute;
    top: 575px;
    left: -70px;
    height:30px;
    font-size: 30px;
    padding: 5px;
    text-align:center;
    color: white;
    font-family: munro;
    transform: rotate(-90deg);
    image-rendering: pixelated;
    `)
    write(icon, "Health")

    return(icon)
}

const makeIcon = () =>{
    const icon = create("div");
    style(icon, `
        position:absolute;
        width: 16px;
        height: 16px;
        background: url(${toolsrc}) -${16*8}px 0px;
        scale: 300%;
        image-rendering: pixelated;
        left: 8px;
        z-index: 5;
        transform: translate(0, 3px);
    `)

    return(icon)
}

const setHealth = (health) =>{
    if (phase === 3 || phase === 4){

    }
    else{
    if(health <= 0){
        updateCutscene(4, true);
        find(".healthbar").textContent = "";
        removeEffects();
        removeEnemies();
        renderRefreshBut();
    }
    else{
    let myhp;
    let healthbar;
    if(find(".healthbar") === null) {myhp = hp; healthbar = health}
    else if (typeof health === 'number') {
        if (health > 25){
            myhp = 25;
        }
        else{
            myhp = health; 
        }
        hp = myhp;
        healthbar = find(".healthbar"); 
        healthbar.textContent = '';


    

    render(healthbar, makeIcon());
    }
    
    for(let i =0; i<myhp; i++){
        const num = 25-i;
        const starthue = 350;
        const endhue = 110 + 360
        const hue = Math.floor((endhue - starthue)*(num/25)+starthue)
        const heart = create("div");
        heart.id = `heart-${num}`;
        style(heart, `
            height:21.6px;
            width: 28px;
            margin: 2px;
            background-color: hsl(${hue}, 70%, 62%);
        `)
        render(healthbar, heart)
    }    
    }
        
}
}

const bossBar = () =>{
    const bbwrap = create("div");
    const height = 12;
    addClass(bbwrap, ["bbwrap"]);
    style(bbwrap, `
        width: 550px;
        max-height: ${height}px;
        background-color: #181425;
        position: absolute;
        left: 40px;
        color:white;
        display:flex;
        justify-content: flex-start;
        padding: 10px;
        align-items: center;
        position:absolute;
        gap: 20px;
        z-index: 5;
    `)

    const bbtext = create("div");
    style(bbtext, `
        font-size: 20px;
        font-family:munro;
        color:white;
    `)
    write(bbtext, "BOSS");
    render(bbwrap, bbtext);

    const bbbar = create("div");
    addClass(bbbar, ["bbbar"]);
    style(bbbar, `
        height: 5px;
        width: 500px;
        background-color: white;
    `)
    render(bbwrap, bbbar);

    render(wrapper, bbwrap)
}

const updateBossBar = (health) =>{
    bosshp = health;
    const bbbar = find(".bbbar");
    if(health <= 0){
        removeEffects();
        removeEnemies();
        remove(wrapper, bbbar)
        if (phase === 2){
        phase = 3;
        setTimeout(() =>{
            updateCutscene(5, true);
            phase = 4;
            nextDialogue(24);
        }, 3000)
        }
    }
    else if (health <= 50){
        phase = 2;
        bbbar.style.width = `${(health/100)*500}px`
    }
    else{
        bbbar.style.width = `${(health/100)*500}px`
    }
}

const displayInfo = (code, rawicon) => {
    const cloned = rawicon.cloneNode(false);
    cloned.id = "infoPic"
    remClass(cloned, ["canvas-icon"])
    if (code === "boss"){
        attribs(cloned, ["width", "height"], [`${256}px`,`${256}px`]);
        style(cloned, `
            padding-left: 5px;
            padding-top: 10px;
            left: -15px;
            position:relative;
        `)
    }
    else{
    attribs(cloned, ["width", "height"], [`${64}px`,`${64}px`]);
    style(cloned, `
        padding-left: 5px;
        padding-top: 10px;
    `)
    }

    const ctx2 = cloned.getContext("2d");
    ctx2.imageSmoothingEnabled = false;
    const img = new Image();
    img.src = cloned.dataset.imgsrc;
    let index = cloned.dataset.index;

    if (["package_drone", "gunner_drone", "missile_drone", "attack_drone", "boss"].includes(code)){
        if(code === "boss"){
        img.onload = function() {
            ctx2.clearRect(0,0,256,256);
            ctx2.drawImage(img, 0, 0, 128, 128, 0, 0, 256,256);
        }
        }
        else{
        img.onload = function() {
            ctx2.clearRect(0,0,64,64);
            ctx2.drawImage(img, 0, 0, 32, 32, 0, 0, 64,64);
        }

        }
    }
    else{
        img.onload = function() {
            ctx2.clearRect(0,0,64,64);
            ctx2.drawImage(img, 16*index, 0, 16, 16, 0, 0, 64,64);
        }
    }
    if(code === "package_drone") index = 8
    if(code === "gunner_drone") index = 9
    if(code === "missile_drone") index = 10
    if(code === "attack_drone") index = 11
    if(code === "boss") index = 12

    const info = find(".infoTop");
    info.textContent = '';

    const title = create("div");
    addClass(title, ["infoTitle"]);
    let tit = code.replace("_", " ");
    tit = tit.replace("_", " ")
    write(title, tit);
    style(title, `
        padding-left: 5px;
        color:white;
        font-family: 'munro';
        font-size: 30px;
        text-transform: capitalize;
    `)

    const text = create("div");
    addClass(text, ["infoText"]);
    style(text, `
        padding-left: 5px;
        color:white;
        font-family: 'munro';
        font-size: 15px;
        white-space: pre;
    `)

    write(text, descriptions[index])

    render(info, title);
    render(info, cloned);
    render(info, text);
}

export {initInfoScreen, displayInfo, setHealth, hp, bosshp, bossBar, updateBossBar};