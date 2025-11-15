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

  /**
   * @brief Draws the icon
   *
   * @param {String} textureID - ID of the texture
   */
  draw(textureID="spritesheet") {
    Renderer.image(
      textureID,
      this.#src,
      this.#dst
    );
  }

  // Accessors
  get dst() { return this.#dst; }
  get src() { return this.#src; }
};