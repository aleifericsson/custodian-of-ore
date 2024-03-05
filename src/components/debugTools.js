import {render, create, addClass, remClass, find, write, detect,style,attribs} from "../scripts/QoL"

let score = -1;

const incrementScore = (scoreele = "bruh") => {
    score+= 1;
    if (scoreele === "bruh"){
        write(find("#score"), `Score: ${score}`)
    }
    else{
        write(scoreele, `Score: ${score}`)
    }

}

const debugTools = () =>{
    const debugWrap = create("div");
    addClass(debugWrap, ["debug-wrapper"]);
    style(debugWrap,`
        position:relative;
    `)

    const slider = create("input");
    slider.id = "slider1";
    detect(slider, "input", slideFunc);
    attribs(slider,["type", "min", "max", "value", "class"], ["range", "0", "640","0","slidey"])
    render(debugWrap, slider);


    const slider2 = create("input");
    slider2.id = "slider2";
    detect(slider2, "input", slideFunc);
    attribs(slider2,["type", "min", "max", "value", "class"], ["range", "0", "640","0","slidey"])
    render(debugWrap, slider2);

    const scoreele = create("h1")
    scoreele.id = "score";
    style(scoreele, `
        color:white;
        font-family: munro;
    `)
    incrementScore(scoreele);
    render(debugWrap, scoreele);

    return debugWrap;
}

const slideFunc = (e) => {
    if (e.target.id === "slider1"){
        const canv = find(".layer-1");
        canv.style.left = `${e.target.value}px`
    }
    else if (e.target.id === "slider2"){
        const butOv = find(".button-overlay");
        butOv.style.left = `${e.target.value}px`
    }
}

export{debugTools, incrementScore, score};