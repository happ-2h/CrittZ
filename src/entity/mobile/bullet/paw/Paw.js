import Vec2D from "../../../../math/Vec2D";
import EntityHandler from "../../../../utils/EntityHandler";
import Entity from "../../../Entity";
import Bullet from "../Bullet";

export default class Paw extends Bullet {
  #delay;       // Delay to drop paw
  #follow;      // Entity to follow

  #followSpeed; // Speed of the target vector

  /**
   * @param {Number} x           - x-position
   * @param {Number} y           - y-position
   * @param {Number} delay       - Time spent following player
   * @param {Entity} follow      - Entity to follow
   * @param {Number} followSpeed - Speed to arrive to target entity
   * @param {Number} dropSpeed   - Speed of falling paw
   */
  constructor(
    x=0,
    y=0,
    delay=0,
    follow=null,
    followSpeed=1,
    dropSpeed=50
  ) {
    super(x, y, 0);

    this.#delay  = delay;
    this.#follow = follow;

    this.#followSpeed = followSpeed;

    this.src.set(8, 24);

    this.vel.set(10, dropSpeed);

    this.stats.atk = 12;
  }

  init() {}

  update(dt) {
    this.#delay -= dt;

    // Follow
    if (this.#delay > 0) {
      this.dir = Vec2D.sub(this.#follow.dst, this.dst);
      this.dir.normalize();
      this.dir.scale(this.#followSpeed);

      let nextx = this.dst.x + this.vel.x * this.dir.x * dt;

      this.dst.x = nextx;
    }
    // Drop
    else {
      this.dir.y = 1;
      let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

      if (nexty >= 40) EntityHandler.remove(this);

      this.dst.y = nexty;
    }
  }
};