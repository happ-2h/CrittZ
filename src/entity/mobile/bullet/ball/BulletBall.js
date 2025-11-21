import { GAME_WIDTH } from "../../../../game/constants";
import EntityHandler from "../../../../utils/EntityHandler";
import Bullet from "../Bullet";

export default class BulletBall extends Bullet {
  constructor(x=0, y=0, dir=1) {
    super(x, y, 0);

    this.src.set(0, 24, 4, 4);
    this.dst.set(x, y, 4, 4);

    this.vel.set(60, 0);

    this.stats.atk = 2;

    this.dir.x = dir;
  }

  init() {}

  update(dt) {
    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;

    if (nextx <= 0 || nextx >= GAME_WIDTH) EntityHandler.remove(this);


    this.dst.x = nextx;
  }
};