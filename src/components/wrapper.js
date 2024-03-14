import {render, create, addClass, remClass, find, write, detect,style} from "../scripts/QoL"
import { wrapper } from "../scripts/elements";

const wrappe = () =>{   
    const rapper = create("div");
    addClass(rapper, ["wrapper"]);
    style(rapper,`
        position:relative;
        border: 5px solid #8b9bb4;
        width:640px;
        height:640px;
    `)
    render(document.body, rapper);
    wrapper = rapper;
    return rapper;
}

const miniWrapper = () =>{
    const rapper = create("div");
    addClass(rapper, ["mini-wrapper"]);
    style(rapper,`
        position:relative;
        background-color: #181425;
        border: 5px solid #8b9bb4;
        width: 640px;
        display:flex;
        justify-content: space-around;
        height:64px;
        align-items:center;
        margin-top: 10px;
    `)
    render(document.body, rapper);

    const text = create("div");
    addClass(text, ["mini-wrapper-text"]);
    style(text,`
        position:relative;
        background-color: #181425;
        border: 5px solid #8b9bb4;
        border-top: none;
        position: absolute;
        top: 64px;
        left: -5px;
        height:30px;
        font-size: 30px;
        padding: 5px;
        text-align:center;
        color: white;
        font-family: munro;
    `)
    write(text, "Toolbar");

    render(rapper, text);

    return rapper;
}

export {wrappe, miniWrapper};