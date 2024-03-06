import { incrementScore, score } from "../components/debugTools";
import { togglePrompt } from "../components/prompts";
import { coin_list, destroySC } from "../components/spritecanvas"
import { find } from "./QoL";
import { playAudio } from "./sounds";
import { trigger } from "./triggers";

const animateSCs = () => {
    coin_list.forEach(coin => {
        drawObj(coin, "increment", "none");
        const overlap = checkCollision(coin, find("#car"));
        if (overlap){
            destroySC(coin);
            incrementScore();
            playAudio("coin");
            if (score === 10){
                trigger("win");
            }
        }
    })
}

const drawObj = (obj, frame, direction) => {
    let fram = frame;
    if (frame === "increment"){
        if (obj.timer === obj.updates_per_frames){
            fram = obj.frame + 1;
            obj.frame = fram;
            obj.timer = 1;
        }
        else {
            obj.timer += 1;
        }
    }
    if (fram === obj.frames){
        if (obj.name === "highlight") fram = 1;
        else fram = 0
        obj.frame = fram;
    }
    if (obj.timer === 1){
        obj.direction = direction;
        const draind = obj.direction_data[direction];
        obj.draw_index = draind;
        const ctx = obj.ele.getContext("2d");
        const size = obj.size;
        const img = obj.img;
        ctx.clearRect(0,0,size,size);
        ctx.drawImage(img, size*fram, size*draind, size, size, 0, 0, size,size);
    }
}

const checkCollision = (sc, thing) => {
    // Get the bounding box of the first element 
    const rect1 = sc.ele.getBoundingClientRect(); 
    
    // Get the bounding box of the second element 
    const rect2 = thing.getBoundingClientRect(); 
    
    // Check if the two elements overlap 
    const overlap = !(rect1.right < rect2.left ||  
                    rect1.left > rect2.right ||  
                    rect1.bottom < rect2.top ||  
                    rect1.top > rect2.bottom); 

    return overlap;
}

export {animateSCs}