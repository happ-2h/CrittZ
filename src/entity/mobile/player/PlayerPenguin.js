import Player      from "./Player";
import SnowballGun from "../../weapon/snowballGun/SnowballGun";

export default class PlayerPenguin extends Player {
  constructor() {
    super();

    this.src.set(40, 0);

    this.stats.luck = 0.5;

    this.weapon = new SnowballGun;

    this.price = 40;

    this.setFrames(5, 7);
  }

  update(dt) {
    this.handleInput([5, 7, 6, 8]);
    this.handleMovement(dt);
    this.handleEntityCollisions(dt, "penguin");

    this.weapon.update(this, dt);
    this.animate(dt);
  }
};