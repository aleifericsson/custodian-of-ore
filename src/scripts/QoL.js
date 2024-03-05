const render = (parent, child) => {
    parent.appendChild(child);
}

const remove = (parent, child) =>{
    parent.removeChild(child);
}

const create = (element) => {
    return document.createElement(element);
}

const addClass = (element, classlist) =>{
    classlist.forEach(clas => {element.classList.add(clas)});
}

const hasClass = (element, clas) => {
    return element.classList.contains(clas);
}

const remClass = (element, classlist) =>{
    classlist.forEach(clas => {element.classList.remove(clas)});
}

const find = (selector) => {
    return document.querySelector(selector);
}

const findAll = (selector) => {
    return document.querySelectorAll(selector);
}
const write = (element, text) => {
    element.textContent = text;
}

const detect = (element, event, func) =>{
    element.addEventListener(event, func);
}

const undetect = (element, event, func) =>{
    element.removeEventListener(event, func);
}

const style = (element, styletext) => {
    element.style.cssText = styletext;
}

const attribs = (element, attribList, values) => {
    attribList.map((attrib,index) => {
        element.setAttribute(attrib, values[index]);
    })
}

const isElement = function($obj){
    try {
        return ($obj.constructor.__proto__.prototype.constructor.name)?true:false;
    }catch(e){
        return false;
    }
}

export {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs, isElement}