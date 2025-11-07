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

  // Animation
  #frame;      // Current frame
  #frames;     // Frame container (only 2)
  #frameTimer; // Frame change timer
  #frameDelay; // Frame change delay

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
      hp:   0,
      atk:  0,
      def:  0,
      luck: 0,
      spd:  0,
      rate: 0.2,
      cap:  5
    };

    this.#frame  = 0;
    this.#frames = [0, 0];
    this.#frameTimer = 0;
    this.#frameDelay = 0;
  }

  /**
   * @brief Draws the entity
   */
  draw() {
    Renderer.image(
      "spritesheet",
      this.#src,
      this.#dst
    );
  }

  /**
   * @brief Increases stats
   */
  incStats() {
    this.#stats.hp   += 1;
    this.#stats.atk  += this.#stats.rate;
    this.#stats.def  += this.#stats.rate;
    this.#stats.luck += this.#stats.rate;
    this.#stats.spd  += this.#stats.rate;

    if (this.#stats.atk  >= this.#stats.cap) this.#stats.atk  = this.#stats.cap;
    if (this.#stats.def  >= this.#stats.cap) this.#stats.def  = this.#stats.cap;
    if (this.#stats.luck >= this.#stats.cap) this.#stats.luck = this.#stats.cap;
    if (this.#stats.spd  >= this.#stats.cap) this.#stats.spd  = this.#stats.cap;
  }

  /**
   * @brief Performs animation calculations
   *
   * @param {Number} dt - Delta time
   */
  animate(dt) {
    this.#frameTimer += dt;

    if (this.#frameTimer >= this.#frameDelay) {
      this.#frameTimer = 0;
      this.#frame = this.#frame + 1 >= this.#frames.length ? 0 : this.#frame + 1;

      this.#src.x = (this.#frames[this.#frame]&0x1F)<<3;
      this.#src.y = (this.#frames[this.#frame]>>5)  <<3;
    }
  }

  /**
   * @brief Sets animation frames
   *
   * @param {Number} frame1 - Tile number based on the spritesheet
   * @param {Number} frame2 - Tile number based on the spritesheet
   */
  setFrames(frame1=0, frame2=0) {
    // Ignore if requesting duplicate
    if (frame1 === this.#frames[0] && frame2 === this.#frames[1]) return;

    // Reset previous frame
    this.#frame      = 0;
    this.#frameTimer = this.#frameDelay;

    this.#frames[0]  = frame1;
    this.#frames[1]  = frame2;
  }

  // Mutators
  set dir(d) { this.#dir = d; }

  set isJumping(j)  { this.#isJumping  = j; }
  set isGrounded(g) { this.#isGrounded = g; }

  set exp(e)        { this.#exp = e;     }
  set expNext(e)    { this.#expNext = e; }
  set level(l)      { this.#level = l;   }

  set frameDelay(f) { this.#frameDelay = f; }

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