import floor_tiles from "../images/tiles.png";
import { tile_list } from "./tiledata";

let tiles;

const updateBackground = (ctx, width, height) => {
    renderTiles(tiles,ctx);
}

const initBackground = (ctx, width, height) =>{
    //tiles = generateTiles();
    tiles = tile_list[0];
    console.log(tiles);
    updateBackground(ctx, width, height);
}

const renderTiles = (tilesf,ctx) =>{
    tiles = tilesf;
    tiles.forEach((row,index) => {
        row.forEach((tile,index2) =>{
            drawTile(tile, index, index2, ctx);
        })
    })
}

const drawTile=(tile,x,y, ctx) =>{
    const size = 64;
    let tileset = new Image();
    tileset.src = floor_tiles;
    tileset.onload = function() {
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        //where s = sprite, d = draw
        //ctx.rotate((90 * Math.PI) / 180);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tileset, tile*32, 0, 32, 32, x*64, y*64, 64,64);
    }  
}

const modifyTile = (x,y, tile) => {
    tiles[x][y] = tile;
}

const getTiles = () => {
    return(tiles);
}

const generateTiles = () => {
    const arr = new Array(10).fill(0).map(()=>new Array(10).fill(0));
    return arr;
}

const clear = (ctx, width, height) =>{
    ctx.clearRect(0, 0, width, height);
}

const detectTile = (x, y) => {
    if (x > 0 && y > 0 && x <= 640 && y <= 640)
    {
        const i = Math.floor(x/64)
        const j = Math.floor(y/64)
        return tiles[i][j]
    }
    else{
        return "outta bounds"
    }
}

export {initBackground, updateBackground, clear, modifyTile, getTiles, detectTile, renderTiles}