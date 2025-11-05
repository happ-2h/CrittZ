import { TILE_SIZE } from "../game/constants";
import Renderer from "../gfx/Renderer";
import Rectangle from "../math/shapes/Rectangle";
import Vec2D from "../math/Vec2D";

export default class Entity {
  #src;   // Image blit source rectangle
  #dst;   // Canvas destination rectangle

  // Physics
  #dir;   // Directional vector
  #vel;   // Velocity vector
  #accel; // Acceleration vector

  // States
  #isJumping;  // Is the player jumping
  #isGrounded; // Is the player on the ground

  constructor(x=0, y=0) {
    if (this.constructor === Entity)
      throw new Error("Cannot instantiate abstract class");

    if (this.init === undefined)
      throw new Error("init() must be implemented");
    if (this.update === undefined)
      throw new Error("update(dt) must be implemented");
    if (this.draw === undefined)
      throw new Error("draw() must be implemented");

    this.#src = new Rectangle(0, 0, TILE_SIZE, TILE_SIZE);
    this.#dst = new Rectangle(x, y, TILE_SIZE, TILE_SIZE);

    this.#dir   = Vec2D.zero();
    this.#vel   = Vec2D.zero();
    this.#accel = Vec2D.zero();

    this.#isJumping  = false;
    this.#isGrounded = false;
  }

  draw() {
    Renderer.image(
      "spritesheet",
      this.#src,
      this.#dst
    );

    /*Renderer.rect(
      this.#dst.x,
      this.#dst.y,
      this.#dst.w,
      this.#dst.h
    );*/
  }

  // Mutators
  set isJumping(j)  { this.#isJumping  = j; }
  set isGrounded(g) { this.#isGrounded = g; }

  // Accessors
  get src()   { return this.#src; }
  get dst()   { return this.#dst; }

  get dir()   { return this.#dir; }
  get vel()   { return this.#vel; }
  get accel() { return this.#accel; }

  get isJumping()  { return this.#isJumping;  }
  get isGrounded() { return this.#isGrounded; }
};