import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

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

    this.init();
  }

  init() {
    this.update(performance.now());
  }

  update(ts) {
    const dt = (ts - this.#last) / 1000;
    this.#last = ts;

    this.#span.textContent = (1/dt).toFixed(3);

    requestAnimationFrame(this.update.bind(this));

    this.render();
  }

  render() {}
};