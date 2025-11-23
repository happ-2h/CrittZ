import Vec2D from "../../../../math/Vec2D";
import EntityHandler from "../../../../utils/EntityHandler";
import Bullet from "../Bullet";

export default class BulletGravity extends Bullet {
  constructor(x=0, y=0) {
    super(x, y, 0);

    this.src.set(0, 24, 4, 4);
    this.dst.set(x, y, 4, 4);

    this.vel.set(60, 60);

    this.stats.atk = 4;

    this.dir = Vec2D.sub(
      EntityHandler.getPlayer(0).dst.pos,
      this.dst.pos
    );

    this.dir.normalize();
  }

  init() {}

  update(dt) {
    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

    if (nexty >= 44) {
      nexty = 44;
      EntityHandler.remove(this);
    }

    this.dst.set(nextx, nexty, 4, 4);
  }
};