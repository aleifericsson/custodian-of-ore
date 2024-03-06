import {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs} from "../scripts/QoL"

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
        ${extra_style}
    `);

    render(find(".shadwrap"), shad);
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

    if (name === "level-1"){
        render(shad, pathBlock(0, 256, 640, 64));
    }
    else if(name === "level-2"){
        render(shad, pathBlock(0, 128, 640, 64));
    }

    render(find(".shadwrap"), shad);
}

const removeShaders = () =>{
    const shadlist = findAll(".shader");
    const shadwrap = find(".shadwrap");

    shadlist.forEach(shad => {remove(shadwrap,shad)});    
}

const pathBlock = (x,y,width,height) => {
    const path = create("div");
    addClass(path, ["pathblock"]);
    style(path, `
        background-color: rgba(245, 66, 66, 0.5);
        left: ${x}px;
        top: ${y}px;
        height: ${height}px;
        width: ${width}px;
        position:absolute;
    `)

    return path;
}

const initShaders = (wrapper) => {
    const shadwrap = create("div");
    addClass(shadwrap, ["shadwrap"]);
    style(shadwrap, `
        height:640px;
        width: 640px;
        position: absolute;
    `);

    render(wrapper, shadwrap);
}

export {initShaders, renderShader, renderLevel, removeShaders}