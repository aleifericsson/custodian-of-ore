const render = (parent, child) => {
    parent.appendChild(child);
}

const remove = (parent, child) =>{
    if (child.parentNode === parent){
        parent.removeChild(child);
    }
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

const moveTo = (element, x, y, size) => {
    element.style.top = y-(size/2) +"px";
    element.style.left = x-(size/2) +"px";
}

const getPos = (evt, myrect) =>{
    const rect = myrect.getBoundingClientRect();
    const mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
    return mousePos
}


const checkCollision = (thing1, thing2) => {
    if (thing1 === null || thing2 === null){
        return false;
    }
    // Get the bounding box of the first element 
    const rect1 = thing1.getBoundingClientRect(); 
    
    // Get the bounding box of the second element 
    const rect2 = thing2.getBoundingClientRect(); 
    
    // Check if the two elements overlap 
    const overlap = !(rect1.right-15 < rect2.left+15 ||  
                    rect1.left+15 > rect2.right-15 ||  
                    rect1.bottom-15 < rect2.top+15 ||  
                    rect1.top+15 > rect2.bottom-15); 

    return overlap;
}

const checkCollisionReal = (thing1, thing2) => {
    if (thing1 === null || thing2 === null){
        return false;
    }
    // Get the bounding box of the first element 
    const rect1 = thing1.getBoundingClientRect(); 
    
    // Get the bounding box of the second element 
    const rect2 = thing2.getBoundingClientRect(); 
    
    // Check if the two elements overlap 
    const overlap = !(rect1.right < rect2.left ||  
                    rect1.left > rect2.right ||  
                    rect1.bottom < rect2.top ||  
                    rect1.top > rect2.bottom); 

    return overlap;
}

const getPosEle = (element, size) => {
    const left = element.style.left;
    const top = element.style.top;
    let x;
    let y;
    if (size === "none"){
        x = Number(left.substring(0, left.length - 2));
        y = Number(top.substring(0, top.length - 2));
    }
    else{
        x = Number(left.substring(0, left.length - 2))+(size/2)
        y = Number(top.substring(0, top.length - 2))+(size/2)
    }
    return {
        x,
        y
    }
}

export {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs, isElement, moveTo, getPos, checkCollision, checkCollisionReal, getPosEle}