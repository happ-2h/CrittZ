import KeyHandler from "../../../input/KeyHandler";
import Entity from "../../Entity";

export default class Player extends Entity {
  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(8, 0);

    this.dir.set(1, 0);
    this.vel.set(40, 40);
  }

  init() {}

  update(dt) {
    if (KeyHandler.isDown("right"))     this.dir.x =  1;
    else if (KeyHandler.isDown("left")) this.dir.x = -1;

    this.dir.normalize();

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;

    if (nextx <= 8)        nextx = 8;
    else if (nextx >= 112) nextx = 112;


    this.dst.x = nextx;
  }
};