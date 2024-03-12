import {render, remove, create, addClass, hasClass, remClass, find, findAll, write, detect, undetect, style, attribs, isElement, moveTo, getPos, checkCollision, checkCollisionReal, getPosEle} from "./QoL"

let bossele;
let boss_att_stack = [];
let boss_timer;

const tickBoss = ()=>{

}

const fireAttack = () =>{

}

const missileAttack = () =>{
    
}

const spawnDrones = () =>{
    
}

const chargeAttack = () =>{
    
}

const evasiveManoevers = () =>{
    
}

const lightningAttack = () =>{

}

const moveBossTowards = (index, x, y, wind) => {
    const obj = sc_list[index]
    const speed = wind ? 2 : obj.speed;
    const myx = x-obj.size/2;
    const myy = y-obj.size/2;
    const dx = myx-obj.x;
    const dy = myy-obj.y;
    const mag = Math.sqrt(dx*dx + dy*dy);
    const ux = (dx/mag)*speed;
    const uy = (dy/mag)*speed;
    const nx = obj.x+ux-obj.size/2;
    const ny = obj.y+uy-obj.size/2;
    let angle = Math.atan(-uy/ux);
    const incoming_tile = detectTile(nx,ny);

/*
    let inpath = false
    findAll(".edge").forEach(path => {
        if (checkCollision(path, obj.ele)){
            inpath = true;
        }
    })

    if (inpath){
        if(obj.name === "package_drone")
        {
            if (checkCollisionReal(find(".edge.left"), obj.ele)) {teleport( index, obj.x+5, obj.y); obj.x=obj.x+5}
            if (checkCollisionReal(find(".edge.right"), obj.ele)) {teleport( index, obj.x-5, obj.y); obj.x=obj.x-5}
            if (checkCollisionReal(find(".edge.top"), obj.ele)) {teleport( index, obj.x, obj.y+5); obj.y=obj.y+5}
            if (checkCollisionReal(find(".edge.bottom"), obj.ele)) {teleport( index, obj.x, obj.y-5); obj.y=obj.y-5}
        }
    }
    */

    let outta_bounds = true

    if (nx <640-64&&nx>0&&ny <640-64&&ny>0) outta_bounds = false;
    if (outta_bounds){
        //uhh
    }
    else if (mag>obj.speed){
        sc_list[index].x = nx+obj.size/2;
        sc_list[index].y = ny+obj.size/2;
        teleport(index, nx, ny)
        let angle = Math.atan(-uy/ux);
        if(ux < 0){
            if (-uy < 0){
                angle = angle - Math.PI;
            }
            else{
                angle = angle+ Math.PI;
            }
        }
        angle = angle*(180/Math.PI)
        let direction = "left";
        if (angle >= 22.5 && angle <= 67.5) direction = "upright"
        else if (angle >= 67.5 && angle <= 112.5) direction = "up"
        else if (angle >= 112.5 && angle <= 157.5) direction = "upleft"
        else if (angle <= 22.5 && angle >= -22.5) direction = "right"
        else if (angle <= -22.5 && angle >= -67.5) direction = "downright"
        else if (angle <= -67.5 && angle >= -112.5) direction = "down"
        else if (angle <= -112.5 && angle >= -157.5) direction = "downleft"
        else if (angle >= 157.5 && angle <= -157.5) direction = "left"

        //drawSC(sc_list[0], "increment", direction);
    }
}

export {tickBoss, bossele}