import {render, remove, create, addClass, hasClass, remClass, find, write, detect, undetect, style, attribs} from "../scripts/QoL"

const initInfoScreen = () =>{
    const info = create("div");
    addClass(info, ["infoScreen"]);
    style(info, `
        width: 250px;
        height: 640px;
        background-color: #242424;
        border: 5px solid darkslategray;
        position: absolute;
        left: 650px;
        top:-5px;
        color:white;
        font-family:munro;
    `)

    render(info, infoTop());
    render(info, infoBottom());
    render(find(".wrapper"), leftScreen());
    render(find(".wrapper"), info);
}

const infoTop = () =>{
    const info = create("div");
    addClass(info, ["infoTop"]);
    style(info, `
        padding: 5px;
    `)

    return(info);
}

const infoBottom = () =>{
    const info = create("div");
    addClass(info, ["infoBottom"]);

    return(info);
}

const leftScreen = () => {
    const left = create("div");
    const width = 32;
    addClass(left, ["infoLeft"]);
    style(left, `
        width: ${width}px;
        height: 640px;
        background-color: #242424;
        border: 5px solid darkslategray;
        position: absolute;
        left: -${width+20}px;
        top:-5px;
        color:white;
        font-family:munro;
    `)
    write(left, "😊")

    return left;
}

const displayInfo = (code, rawicon) => {
    const cloned = rawicon.cloneNode(false);
    cloned.id = "infoPic"
    remClass(cloned, ["canvas-icon"])
    style(cloned, `
        height:64px;
        width:64px;
        background: url(${cloned.dataset.imgsrc});
    `)

    const info = find(".infoTop");
    info.textContent = '';

    const title = create("div");
    addClass(title, ["infoTitle"]);
    write(title, code);
    style(title, `
        padding-left: 5px;
        color:white;
        font-family: 'munro';
        font-size: 30px;
    `)

    const text = create("div");
    addClass(text, ["infoText"]);
    style(text, `
        padding-left: 5px;
        color:white;
        font-family: 'munro';
        font-size: 15px;
    `)

    if (code === "can"){
        write(text,"the can is for water");
    }
    else if (code === "coin"){
        write(text, "the coin is for car somehow");
    }

    render(info, title);
    render(info, cloned);
    render(info, text);
}

export {initInfoScreen, displayInfo};