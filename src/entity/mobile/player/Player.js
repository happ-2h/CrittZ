import Entity        from "../../Entity";
import EntityHandler from "../../../utils/EntityHandler";
import KeyHandler    from "../../../input/KeyHandler";
import Shop          from "../../pickup/Shop";
import Skin          from "../../../gfx/ui/Skin";
import StateGameOver from "../../../game/state/StateGameOver";
import StateHandler  from "../../../utils/StateHandler";
import StateShop     from "../../../game/state/StateShop";

import { GRAVITY } from "../../../math/constants";

export default class Player extends Entity {
  #weapon; // Current weapon
  #money;  // Total of collected money
  #price;  // Price of player (for main menu shop)

  // Game stats
  #enemiesKilled;
  #bossesKilled;

  constructor() {
    super(60, 40);

    this.dir.set(1, 0);
    this.vel.set(40, 0);

    this.exp   = 0;
    this.level = 1;
    this.stats.hp    = 50;
    this.stats.maxHp = 50;
    this.stats.def   =  1;
    this.stats.luck  =  1;
    this.stats.spd   =  1;

    this.frameDelay = 0.2;

    this.#money = 0;
    this.#price = 999;

    this.#enemiesKilled = 0;
    this.#bossesKilled  = 0;
  }

  init() {}

  /**
   * @brief Handles player input
   *
   * @param {Array} frames - [0] = Tile ID of right frame 1\
   *                         [1] = Tile ID of right frame 2\
   *                         [2] = Tile ID of left frame 1\
   *                         [3] = Tile ID of left frame 2
   */
  handleInput(frames=[0, 0, 0, 0]) {
    if (KeyHandler.isDown("right")) {
      this.dir.x =  1;
      this.setFrames(frames[0], frames[1]);
    }
    else if (KeyHandler.isDown("left")) {
      this.dir.x = -1;
      this.setFrames(frames[2], frames[3]);
    }

    if (KeyHandler.isDown("ActionA")) {
      if (this.isGrounded && !this.isJumping) {
        this.vel.y = -90;
        this.isJumping  = true;
        this.isGrounded = false;
      }
    }
  }

  /**
   * @brief Handles movement of the player
   *
   * @param {Number} dt - Delta time
   */
  handleMovement(dt) {
    this.dir.normalize();

    this.vel.y += GRAVITY * dt;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * dt;

    if (nextx <= 8) nextx = 8;
    else if (nextx >= 112) nextx = 112;

    if (nexty >= 40) {
      nexty = 40;
      this.vel.y = 0;
      this.isGrounded = true;
      this.isJumping  = false;
    }

    this.dst.set(nextx, nexty);
  }

  /**
   * @brief Handles entity collisions (this->enemies, this->bullets, this->pickups)
   *
   * @param {Number} dt     - Delta time
   * @param {String} player - Player for shop upgrades
   */
  handleEntityCollisions(dt, player="") {
    if (this.invTimer <= 0) {
      EntityHandler.enemies.forEach(e => {
        if (this.dst.intersects(e.dst)) {
          let damage = e.stats.atk - this.stats.def;

          if (damage <= 0) damage = 1;

          this.stats.hp -= damage;

          this.invTimer = this.invDelay;

          Skin.setHealth(this.stats.hp, this.stats.maxHp);

          if (this.stats.hp <= 0) {
            StateHandler.pop();
            StateHandler.push(new StateGameOver);
          }
        }
      });

      EntityHandler.bullets.forEach(b => {
        if (b.fromPlayer) return;

        if (this.dst.intersects(b.dst)) {
          let damage = b.stats.atk - this.stats.def;

          if (damage <= 0) damage = 1;

          this.stats.hp -= damage;

          this.invTimer = this.invDelay;

          Skin.setHealth(this.stats.hp, this.stats.maxHp);

          if (this.stats.hp <= 0) {
            StateHandler.pop();
            StateHandler.push(new StateGameOver);
          }
        }
      });
    }
    else this.invTimer -= dt;

    EntityHandler.pickups.forEach(p => {
      if (this.dst.intersects(p.dst)) {
        if (p instanceof Shop)
          StateHandler.push(new StateShop(player));

        this.money += p.value;
        Skin.setMoney(this.money);

        EntityHandler.remove(p);
      }
    });
  }

  levelUp() {
    this.expNext = 10 + 5 * this.level * (this.level - 1);
    ++this.level;
    this.incStats();

    Skin.setLevel(this.level);
  }

  // Mutators
  set weapon(w) { this.#weapon = w; }
  set money(m)  { this.#money  = m; }
  set price(p)  { this.#price  = p; }
  set enemiesKilled(e) { this.#enemiesKilled = e; }
  set bossesKilled(b)  { this.#bossesKilled  = b; }

  // Accessors
  get weapon() { return this.#weapon; }
  get money()  { return this.#money;  }
  get price()  { return this.#price;  }
  get enemiesKilled() { return this.#enemiesKilled; }
  get bossesKilled()  { return this.#bossesKilled;  }
};