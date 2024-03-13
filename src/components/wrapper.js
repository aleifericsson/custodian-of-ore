import {render, create, addClass, remClass, find, write, detect,style} from "../scripts/QoL"
import { wrapper } from "../scripts/elements";

const wrappe = () =>{   
    const rapper = create("div");
    addClass(rapper, ["wrapper"]);
    style(rapper,`
        position:relative;
        border: 5px solid darkred;
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
        background-color: #000000;
        border: 5px solid darkred;
        width: 640px;
        display:flex;
        justify-content: space-around;
        height:64px;
        align-items:center;
        margin-top: 10px;
    `)
    render(document.body, rapper);
    return rapper;
}

export {wrappe, miniWrapper};