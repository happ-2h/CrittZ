import { SCALE, TILE_SIZE } from "../game/constants";
import Rectangle from "../math/shapes/Rectangle";
import TextureHandler from "../utils/TextureHandler";

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

  /**
   * @brief Clears an area of the canvas from (0, 0) to (width, height)
   *
   * @param {Number} width  - Width  of area to clear
   * @param {Number} height - Height of area of clear
   */
  clear(width=0, height=0) {
    this.#ctx.clearRect(0, 0, width, height);
  }

  /**
   * @brief Draws an image to the canvas
   *
   * @param {String} textureID - ID of the texture
   * @param {Rectangle} src    - Blit image source
   * @param {Rectangle} dst    - Destination to draw the image
   */
  image(textureID="", src=null, dst=null) {
    this.#ctx.drawImage(
      TextureHandler.getTexture(textureID),
      src.x, src.y, src.w, src.h,
      dst.x * SCALE,
      dst.y * SCALE,
      dst.w * SCALE,
      dst.h * SCALE
    );
  }
};

const Renderer = new _Renderer;
export default Renderer;