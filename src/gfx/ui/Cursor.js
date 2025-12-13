import Rectangle from "../../math/shapes/Rectangle";
import Renderer  from "../Renderer";

export default class Cursor {
  #src; // Image blit source
  #dst; // Canvas destination

  #animTimer;  // Animation timer
  #animDelay;  // Animation delay
  #animFrame;  // Current animation frame
  #animFrames; // Animation frame numbers

  constructor(x, y) {
    this.#dst = new Rectangle(x, y);
    this.#src = new Rectangle(24, 216);

    this.#animTimer  = 0;
    this.#animDelay  = 0.3;
    this.#animFrame  = 0;
    this.#animFrames = [867, 868];
  }

  /**
   * @brief Updates the cursor
   *
   * @param {Number} dt - Delta time
   */
  update(dt) {
    this.#animTimer += dt;

    if (this.#animTimer >= this.#animDelay) {
      this.#animTimer = 0;

      this.#animFrame = this.#animFrame + 1 >= 2 ? 0 : this.#animFrame + 1;
      this.#src.x = (this.#animFrames[this.#animFrame]&0x1F)<<3;
      this.#src.y = (this.#animFrames[this.#animFrame]>>5)<<3;
    }
  }

  /**
   * @brief Draws the cursor
   */
  draw() {
    Renderer.image(
      "spritesheet",
      this.#src,
      this.#dst
    );
  }

  // Mutators
  set x(x) { this.#dst.x = x; }
  set y(y) { this.#dst.y = y; }
};