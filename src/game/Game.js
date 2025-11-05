import Player from "../entity/mobile/player/Player";
import Renderer from "../gfx/Renderer";
import AssetHandler from "../utils/AssetHandler";
import MapHandler from "../utils/MapHandler";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

export default class Game {
  #cnv;  // HTML5 canvas reference
  #span; // Temp span for displaying FPS

  #last; // Holds previous RAF timestamp

  #player; // TEMP

  constructor() {
    this.#cnv = document.querySelector("canvas");
    this.#cnv.width  = SCREEN_WIDTH;
    this.#cnv.height = SCREEN_HEIGHT;
    this.#cnv.autofocus = true;

    this.#span = document.querySelector("span");

    this.#last = performance.now();

    this.#player = new Player(60, 40);

    AssetHandler.poll("spritesheet", "spritesheet.png");
    AssetHandler.poll("testMap", "test.json");

    AssetHandler.load()
      .then(val  => this.init())
      .catch(err => console.error(err));

  }

  init() {
    Renderer.init(this.#cnv.getContext("2d"));

    this.update(performance.now());
  }

  update(ts) {
    const dt = (ts - this.#last) / 1000;
    this.#last = ts;

    this.#span.textContent = (1/dt).toFixed(3);

    requestAnimationFrame(this.update.bind(this));

    this.#player.update(dt);

    this.render();
  }

  render() {
    Renderer.clear(this.#cnv.width, this.#cnv.height);

    MapHandler.getMap("testMap").draw();

    this.#player.draw();
  }
};