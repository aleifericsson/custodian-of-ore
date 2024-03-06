import coinsrc from "../images/coin.png";

//MOSTLY DEFUNCT NOW, DELETE IN REAL PROJECTS

function Sprite(name,imgsrc, frames, twos, size, x, y){
    this.name = name;
    this.imgsrc = imgsrc;
    this.frames = frames;
    this.size = size;
    this.currentFrame = 0;
    this.x = x;
    this.y = y;
    this.twos = twos;
    this.draw = function(ctx){
        let img = new Image();
        img.src = this.imgsrc;
        const sz = this.size;
        let fram;
        if (this.twos){
            fram = Math.floor(this.currentFrame);
        }
        else{
            fram = this.currentFrame;
        }  
        const ex = this.x;
        const ey = this.y;
        img.onload = function() {
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        //where s = sprite, d = draw

        ctx.clearRect(ex, ey, sz, sz);
        ctx.drawImage(img, fram*sz, 0, sz, sz, ex, ey, sz,sz);
        }
    }
    this.nextFrame = function(){
        if (this.twos){
            this.currentFrame+=0.5;
        }
        else{
            this.currentFrame+=1;
        }
        if (this.currentFrame >= frames){
            this.currentFrame=0;
        }
}
}

const initSprites = () =>{
    const coin = new Sprite("coin_1", coinsrc, 12,true, 64, 50,50);
    spriteList.push(coin);
    //const car = new Sprite ("car", carsrc, 3, true, 64, 750, 200)
    //spriteList.push(car);
}

const spriteList = [];

export {spriteList, initSprites}