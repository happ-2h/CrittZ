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

  // Stats
  #exp;     // Experience points
  #expNext; // Experience needed to level up
  #level;   // Level number
  #stats;   // Stats object

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

    this.#exp     = 0;
    this.#expNext = 0;
    this.#level   = 1;
    this.#stats = {
      atk:  0,
      def:  0,
      luck: 0,
      spd:  0,
      rate: 0.2,
      cap:  5
    };
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

  incStats() {
    this.#stats.atk  += this.#stats.rate;
    this.#stats.def  += this.#stats.rate;
    this.#stats.luck += this.#stats.rate;
    this.#stats.spd  += this.#stats.rate;

    if (this.#stats.atk  >= this.#stats.cap) this.#stats.atk  = this.#stats.cap;
    if (this.#stats.def  >= this.#stats.cap) this.#stats.def  = this.#stats.cap;
    if (this.#stats.luck >= this.#stats.cap) this.#stats.luck = this.#stats.cap;
    if (this.#stats.spd  >= this.#stats.cap) this.#stats.spd  = this.#stats.cap;
  }

  // Mutators
  set isJumping(j)  { this.#isJumping  = j; }
  set isGrounded(g) { this.#isGrounded = g; }

  set exp(e)        { this.#exp = e;     }
  set expNext(e)    { this.#expNext = e; }
  set level(l)      { this.#level = l;   }

  // Accessors
  get src()   { return this.#src; }
  get dst()   { return this.#dst; }

  get dir()   { return this.#dir; }
  get vel()   { return this.#vel; }
  get accel() { return this.#accel; }

  get isJumping()  { return this.#isJumping;  }
  get isGrounded() { return this.#isGrounded; }

  get exp()     { return this.#exp;     }
  get expNext() { return this.#expNext; }
  get level()   { return this.#level;   }
  get stats()   { return this.#stats;   }
};