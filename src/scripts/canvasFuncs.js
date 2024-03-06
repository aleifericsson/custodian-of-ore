import floor_tiles from "../images/floor_tiles.png";

let tiles;
const collision_tiles = [11,14,15,16,19]

const updateBackground = (ctx, width, height) => {
    renderTiles(tiles,ctx);
}

const initBackground = (ctx, width, height) =>{
    tiles = generateTiles();
    tiles[2][1] = 11;
    tiles[9][9] = 18;
    tiles[9][8] = 18;
    tiles[8][8] = 19;
    tiles[8][9] = 19;
    console.log(tiles);
    updateBackground(ctx, width, height);
}

const renderTiles = (tiles,ctx) =>{
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
        ctx.drawImage(tileset, tile*size, 0, size, size, x*size, y*size, size,size);
    }  
}

const modifyTile = (x,y, tile) => {
    tiles[x][y] = tile;
}

const getTiles = () => {
    return(tiles);
}

const generateTiles = () => {
    const arr = new Array(10).fill(0).map(()=>new Array(10).fill(10));
    return arr;
}

const clear = (ctx, width, height) =>{
    ctx.clearRect(0, 0, width, height);
}

const detectTile = (x, y) => {
    const i = Math.floor(x/64)
    const j = Math.floor(y/64)
    return tiles[i][j]
}

export {initBackground, updateBackground, clear, modifyTile, getTiles, collision_tiles, detectTile}