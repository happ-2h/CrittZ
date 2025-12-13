import Gun    from "../../weapon/gun/Gun";
import Player from "./Player";

export default class PlayerGoose extends Player {
  constructor() {
    super();

    this.src.set(72, 0);

    this.stats.luck = 0.3;

    this.weapon = new Gun;

    this.price = 100;

    this.setFrames(9, 11);
  }

  update(dt) {
    this.handleInput([9, 11, 10, 12]);
    this.handleMovement(dt);
    this.handleEntityCollisions(dt, "goose");

    this.weapon.update(this, dt);
    this.animate(dt);
  }
};