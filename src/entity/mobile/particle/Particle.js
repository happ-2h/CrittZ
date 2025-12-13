import Entity from "../../Entity";
import Vec2D  from "../../../math/Vec2D";

export default class Particle extends Entity {
  constructor(x=0, y=0, angle=0) {
    super(x, y);

    this.dir = Vec2D.angToVec(angle);
  }

  init() {}

  update(dt) {}
};