export default class Game {
  #cnv; // HTML5 canvas reference

  constructor() {
    this.#cnv = document.querySelector("canvas");
    this.#cnv.width  = 128;
    this.#cnv.height =  72;
    this.#cnv.autofocus = true;
  }
};