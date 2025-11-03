import { TILE_SIZE } from "../game/constants";
import Renderer from "../gfx/Renderer";
import Rectangle from "../math/shapes/Rectangle";

export default class Entity {
  #src; // Image blit source rectangle
  #dst; // Canvas destination rectangle

  constructor() {
    if (this.constructor === Entity)
      throw new Error("Cannot instantiate abstract class");

    if (this.init === undefined)
      throw new Error("init() must be implemented");
    if (this.update === undefined)
      throw new Error("update(dt) must be implemented");
    if (this.draw === undefined)
      throw new Error("draw() must be implemented");

    this.#src = new Rectangle(0, 0, TILE_SIZE, TILE_SIZE);
    this.#dst = new Rectangle(0, 0, TILE_SIZE, TILE_SIZE);
  }

  draw() {
    Renderer.rect(
      this.#dst.x,
      this.#dst.y,
      this.#dst.w,
      this.#dst.h
    );
  }

  // Accessors
  get src() { return this.#src; }
  get dst() { return this.#dst; }
};