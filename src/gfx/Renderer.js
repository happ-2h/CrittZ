import { SCALE, TILE_SIZE } from "../game/constants";

let instance = null;

class _Renderer {
  /**@type {CanvasRenderingContext2D} */
  #ctx; // HTML5 canvas context

  constructor() {
    if (instance) throw new Error("Renderer singleton reconstructed");

    this.#ctx = null;

    instance = this;
  }

  /**
   * @brief Initializes the renderer
   *
   * @param {CanvasRenderingContext2D} context2d - HTML5 Canvas context
   */
  init(context2d) {
    if (context2d instanceof CanvasRenderingContext2D) {
      this.#ctx = context2d;
      this.#ctx.imageSmoothingEnabled = false;
    }
  }

  /**
   * @brief Draws a stroked rectangle to the canvas
   *
   * @param {Number} x      - x-position of the rectangle
   * @param {Number} y      - y-position of the rectangle
   * @param {Number} width  - Width  of the rectangle
   * @param {Number} height - Height of the rectangle
   * @param {String} color  - Color of the outline
   */
  rect(x=0, y=0, width=TILE_SIZE, height=TILE_SIZE, color="red") {
    this.#ctx.strokeStyle = color;

    this.#ctx.strokeRect(
      x      * SCALE,
      y      * SCALE,
      width  * SCALE,
      height * SCALE
    );
  }
};

const Renderer = new _Renderer;
export default Renderer;