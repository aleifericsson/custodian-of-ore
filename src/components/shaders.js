import {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs} from "../scripts/QoL"
import { level } from "../scripts/data";
import { shadwrap } from "../scripts/elements";
import { enemy, removeEnemies, spawnEnemies } from "../scripts/enemies";
import { nextDialogue } from "./dialogue";
import { effect, removeEffects } from "./effects";

const renderShader = (name) => {
    const shad = create("div");
    addClass(shad, ["shader"]);
    shad.id = name;
    let extra_style;
    if (name === "light-shader"){
        extra_style = `
            background-image: linear-gradient(135deg, rgba(227, 245, 66, 0.3), rgba(230, 201, 147, 0.1));
        `
    }
    else if(name === "dark-shader"){
        extra_style = `
            background-image: linear-gradient(135deg, rgba(54, 88, 163, 0.3), rgba(90, 76, 115, 0.6));
        `
    }

    style(shad, `
        height:640px;
        width: 640px;
        position: absolute;
        z-index: 5;
        ${extra_style}
    `);

    render(shadwrap, shad);
}

const renderLevel = (name) =>{
    const shad = create("div");
    addClass(shad, ["level", "shader"]);
    shad.id = name;
    
    style(shad, `
        height:640px;
        width: 640px;
        position: absolute;
    `);
    removeEffects();
    spawnEnemies(name);
    if (name === "level-1"){
        render(shad, pathBlock(0, 200, 300, 150));
        render(shad, pathBlock(200, 350, 440, 150));
        nextDialogue(7)
    }
    else if(name === "level-2"){
        render(shad, pathBlock(400, 200, 240, 100));
        render(shad, pathBlock(300, 200, 100, 300));
        render(shad, pathBlock(100,500,300, 50));
        render(shad, pathBlock(0, 550, 150, 50));
    }
    else if (name === "level-3"){
        render(shad, pathBlock(140, 550, 500, 50));
        render(shad, pathBlock(140, 320, 50, 230));
        render(shad, pathBlock(140, 270, 320, 50));
        render(shad, pathBlock(410, 220, 50, 50));
        render(shad, pathBlock(0, 170, 460, 50));
    }
    else if (name === "level-4"){
        render(shad, pathBlock(360, 170, 280, 100));
        render(shad, pathBlock(220, 270, 200, 50));
        render(shad, pathBlock(100, 320, 170, 50));
        render(shad, pathBlock(0, 370, 160, 50));
        nextDialogue(9)
    }
    else if (name === "level-5"){
        render(shad, pathBlock(400, 370, 160, 50));
        render(shad, pathBlock(430, 230, 50, 360));
        render(shad, pathBlock(317, 180, 233, 50));
        
        render(shad, pathBlock(550, 78, 50, 152));
        render(shad, pathBlock(100, 478, 50, 112));
        render(shad, pathBlock(267, 275, 50, 203));
        render(shad, pathBlock(188, 78, 50, 111));
        render(shad, pathBlock(138, 134, 50, 141));

        render(shad, pathBlock(100, 28, 500, 50));
        render(shad, pathBlock(100, 590, 380, 50));
        render(shad, pathBlock(100, 428, 167, 50));
        render(shad, pathBlock(0, 275, 267, 50));
    }
    else if (name === "level-6"){
        render(shad, pathBlock(373, 275, 267, 50));
        render(shad, pathBlock(373, 325, 50, 315));
        nextDialogue(11)
    }
    else if (name === "level-7")
        nextDialogue(13)
    else if (name === "level-10"){
        const end = find(".endblock");
        remove(shadwrap, end);
        nextDialogue(15)
    }
    
    
    render(shadwrap, shad);
}

const removeShaders = () =>{
    const shadlist = findAll(".shader");

    shadlist.forEach(shad => {remove(shadwrap,shad)});    
}

const pathBlock = (x,y,width,height) => {
    const path = create("div");
    addClass(path, ["pathblock"]);
    style(path, `
        background-color: rgba(245, 66, 66, 0.3);
        left: ${x}px;
        top: ${y}px;
        height: ${height}px;
        width: ${width}px;
        position:absolute;
    `)

    return path;
}

const removePaths = () =>{
    const shadlist = findAll(".pathblock");


    shadlist.forEach(shad => {remove(shadwrap,shad)});    
}

const endBlock = (thing) => {
    const path = create("div");
    addClass(path, ["endblock"]);
        style(path, `
            background-color: rgba(34, 117, 59, 0.6);
            left: ${0}px;
            top: ${0}px;
            height: ${640}px;
            width: ${10}px;
            position:absolute;
        `)

    return path;
}

const initEdges = (wrapper) =>{
    let path = create("div");
    addClass(path, ["edge", "left"]);
        style(path, `
            left: ${-15}px;
            top: ${-10}px;
            height: ${660}px;
            width: ${10}px;
            position:absolute;
    `)
    render(wrapper, path)

    path = create("div");
    addClass(path, ["edge","top"]);
        style(path, `
            left: ${-10}px;
            top: ${-15}px;
            height: ${10}px;
            width: ${660}px;
            position:absolute;
    `)
    render(wrapper, path)

    path = create("div");
    addClass(path, ["edge", "bottom"]);
        style(path, `
            left: ${0}px;
            top: ${635}px;
            height: ${10}px;
            width: ${660}px;
            position:absolute;
    `)
    render(wrapper, path)

    path = create("div");
    addClass(path, ["edge", "right"]);
        style(path, `
            left: ${635}px;
            top: ${0}px;
            height: ${660}px;
            width: ${10}px;
            position:absolute;
    `)
    render(wrapper, path)
}

const initShaders = (wrapper) => {
    const shadwra = create("div");
    addClass(shadwra, ["shadwrap"]);
    style(shadwra, `
        height:640px;
        width: 640px;
        position: absolute;
        pointer-events:none;
        z-index:4;
    `);

    render(wrapper, shadwra);
    render(shadwra, endBlock("start"));
    shadwrap = shadwra;
    initEdges(wrapper)
}

export {initShaders, renderShader, renderLevel, removeShaders, removePaths}