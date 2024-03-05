import {render, remove, create, addClass, hasClass, remClass, find, write, detect, undetect, style, attribs, isElement} from "../scripts/QoL"

let hp = 20;

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
    render(find(".wrapper"), healthBar());
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

const healthBar = () => {
    const health = create("div");
    const width = 32;
    addClass(health, ["healthbar"]);
    style(health, `
        width: ${width}px;
        height: 640px;
        background-color: #242424;
        border: 5px solid darkslategray;
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

    return health;
}

const setHealth = (health) =>{
    let myhp;
    let healthbar;
    if(find(".healthbar") === null) {myhp = hp; healthbar = health}
    else if (typeof health === 'number') {
        myhp = health; 
        hp = myhp;
        healthbar = find(".healthbar"); 
        healthbar.textContent = '';
    }
    
    for(let i =0; i<myhp; i++){
        const num = 20-i;
        const starthue = 350;
        const endhue = 110 + 360
        const hue = Math.floor((endhue - starthue)*(num/20)+starthue)
        const heart = create("div");
        heart.id = `heart-${num}`;
        style(heart, `
            height:28px;
            width: 28px;
            margin: 2px;
            background-color: hsl(${hue}, 70%, 62%);
        `)
        render(healthbar, heart)
    }
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

export {initInfoScreen, displayInfo, setHealth};