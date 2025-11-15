import Renderer from "../gfx/Renderer";
import Skin from "../gfx/ui/Skin";
import AssetHandler from "../utils/AssetHandler";
import StateHandler from "../utils/StateHandler";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import StateTitleScreen from "./state/StateTitleScreen";

export default class Game {
  #cnv;  // HTML5 canvas reference
  #span; // Temp span for displaying FPS

  #last; // Holds previous RAF timestamp

  constructor() {
    this.#cnv = document.querySelector("canvas");
    this.#cnv.width  = SCREEN_WIDTH;
    this.#cnv.height = SCREEN_HEIGHT;
    this.#cnv.autofocus = true;

    this.#span = document.querySelector("span");

    this.#last = performance.now();

    AssetHandler.poll("spritesheet", "spritesheet.png");
    AssetHandler.poll("skins", "skins.png");
    AssetHandler.poll("testMap", "test.json");

    AssetHandler.load()
      .then(val  => this.init())
      .catch(err => console.error(err));
  }

  init() {
    Renderer.init(this.#cnv.getContext("2d"));

    StateHandler.push(new StateTitleScreen);

    // TEMP load save file
    Skin.loadSkins();

    this.update(performance.now());
  }

  update(ts) {
    const dt = (ts - this.#last) / 1000;
    this.#last = ts;

    this.#span.textContent = (1/dt).toFixed(3);

    requestAnimationFrame(this.update.bind(this));

    StateHandler.update(dt);

    this.render();
  }

  render() {
    Renderer.clear(this.#cnv.width, this.#cnv.height);

    StateHandler.render();
  }
};