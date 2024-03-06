import { addClass, create, render, style } from "./scripts/QoL";
import {initCanvases, initDebug, initOther, initButtonOverlay} from "./scripts/start";
import { trigger } from "./scripts/triggers";

const game = create("div");
addClass(game, ["game"]);
render(document.body, game);
style(game, `
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
    width:100%;
    left: -100px;
`)

render(game, initCanvases());
render(game, initOther());
render(game, initDebug());

trigger("start");