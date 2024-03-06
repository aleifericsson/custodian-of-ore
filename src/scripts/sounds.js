import click from "../sounds/click.mp3"
import close from "../sounds/close.mp3"
import coin from "../sounds/coin.mp3"
import epic from "../sounds/epic_battle_of_fantasies.mp3"
import swipe from "../sounds/swipe.mp3"
import open from "../sounds/open.mp3"

let audios = [];

const makeAudio = (src,name) => {
    var audio = new Audio(src);
    audios.push({
        audio,
        name
    });
}

const initAudios = () =>{
    makeAudio(click, "click");
    makeAudio(close, "close");
    makeAudio(coin, "coin");
    makeAudio(epic, "epic");
    makeAudio(swipe, "swipe");
    makeAudio(open, "open");
}

const playAudio = (name) =>{
    var obj = audios.find(obj => {
        return obj.name === name
      })
      obj.audio.play();
}

export {initAudios, playAudio}