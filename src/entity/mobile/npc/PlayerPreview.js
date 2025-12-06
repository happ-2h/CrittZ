import EntityHandler from "../../../utils/EntityHandler";
import Entity from "../../Entity";
import BulletGun from "../bullet/gun/BulletGun";
import Snowball from "../bullet/snowball/Snowball";
import PlayerGoose from "../player/PlayerGoose";
import PlayerPenguin from "../player/PlayerPenguin";

export default class PlayerPreview extends Entity {
  #players;       // Available players
  #currentPlayer; // Current player to preview
  #fireRate;      // Rate to fire bullet
  #fireTimer;     // Fire timer

  constructor() {
    super();

    this.#players = [
      new PlayerPenguin,
      new PlayerGoose
    ];

    this.#currentPlayer = 0;

    this.#fireRate = 0.3;
    this.#fireTimer = 0;
  }

  init() {}

  update(dt) {
    this.#fireTimer += dt;

    if (this.#fireTimer >= this.#fireRate) {
      this.#fireTimer = 0;

      if (this.#currentPlayer === 0) {
        EntityHandler.add(new Snowball(
          this.#players[this.#currentPlayer].dst.x + 4,
          this.#players[this.#currentPlayer].dst.y,
          1, this
        ));
      }
      else if (this.#currentPlayer === 1) {
        EntityHandler.add(new BulletGun(
          this.#players[this.#currentPlayer].dst.x + 4,
          this.#players[this.#currentPlayer].dst.y + 2,
          1, this
        ))
      }
    }

    this.#players[this.#currentPlayer].animate(dt);

    EntityHandler.updateBullets(dt);
  }

  draw() {
    EntityHandler.drawBullets();
    this.#players[this.#currentPlayer].draw();
  }

  // Mutators
  set currentPlayer(c) { this.#currentPlayer = c; }

  // Accessors
  get players()       { return this.#players; }
  get currentPlayer() { return this.#currentPlayer; }
};