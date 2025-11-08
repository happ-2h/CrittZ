import Rectangle from "../../math/shapes/Rectangle";
import Renderer from "../Renderer";

export default class Icon {
  #src; // Image blit source Rectangle
  #dst; // Canvas placement Rectangle

  /**
   * @param {Rectangle} src - Image blit source
   * @param {Rectangle} dst - Canvas placement
   */
  constructor(src, dst) {
    this.#src = src;
    this.#dst = dst;
  }

  draw() {
    Renderer.image(
      "spritesheet",
      this.#src,
      this.#dst
    );
  }
};