import { GAME_WIDTH, TILE_SIZE } from "../../../../game/constants";
import Vec2D from "../../../../math/Vec2D";
import EntityHandler from "../../../../utils/EntityHandler";
import ParticleSlime from "../../particle/ParticleSlime";
import Enemy from "../Enemy";

export default class Crow extends Enemy {
  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(96, 16);
    this.vel.set(50, 50);

    if (EntityHandler.getPlayer(0).dst.pos.x >= GAME_WIDTH>>1)
      this.dst.pos.x = GAME_WIDTH - TILE_SIZE
    else
      this.dst.pos.x = TILE_SIZE

    this.dir = Vec2D.sub(
      EntityHandler.getPlayer(0).dst.pos,
      this.dst.pos
    );

    this.dir.normalize();

    this.exp = 2;
    this.stats.atk = 2;
    this.frameDelay = 0.05;

    if (this.dir.x > 0) this.setFrames(76, 78);
    else                this.setFrames(77, 79);
  }

  init() {}

  update(dt) {
    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

    if (nexty >= 40) {
      EntityHandler.remove(this);

      EntityHandler.add(new ParticleSlime(this.dst.x, this.dst.y, 4.1887));
      EntityHandler.add(new ParticleSlime(this.dst.x, this.dst.y, 5.2359));
      EntityHandler.add(new ParticleSlime(this.dst.x, this.dst.y, 4.7123));
    }

    this.dst.set(nextx, nexty);

    this.animate(dt);
  }

};