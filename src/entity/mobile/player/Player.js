import Skin from "../../../gfx/ui/Skin";
import KeyHandler from "../../../input/KeyHandler";
import { GRAVITY } from "../../../math/constants";
import EntityHandler from "../../../utils/EntityHandler";
import Entity from "../../Entity";
import Sword from "../../weapon/sword/Sword";

export default class Player extends Entity {
  #weapon;   // Current weapon
  #invDelay; // Invincibility delay
  #invTimer; // Invincibility timer

  constructor(x=0, y=0) {
    super(x, y);

    this.src.set(8, 0);

    this.dir.set(1, 0);
    this.vel.set(40, 0);

    this.#weapon = new Sword(x+8, y);

    this.exp   = 0;
    this.level = 1;
    this.stats.hp = 50;

    this.#invDelay = 0.5;
    this.#invTimer = 0;

    this.frameDelay = 0.2;

    this.setFrames(1, 3);
  }

  init() {}

  update(dt) {
    if (KeyHandler.isDown("right")) {
      this.dir.x =  1;
      this.setFrames(1, 3);
    }
    else if (KeyHandler.isDown("left")) {
      this.dir.x = -1;
      this.setFrames(2, 4);
    }

    if (KeyHandler.isDown("ActionA")) {
      if (this.isGrounded && !this.isJumping) {
        this.vel.y = -90;
        this.isJumping  = true;
        this.isGrounded = false;
      }
    }

    this.dir.normalize();

    this.vel.y += GRAVITY * dt;

    let nextx = this.dst.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.y + this.vel.y * dt;

    if (nextx <= 8 + this.#weapon.dst.w)
      nextx = 8 + this.#weapon.dst.w;
    else if (nextx >= 112 - this.#weapon.dst.w)
      nextx = 112 - this.#weapon.dst.w;

    if (nexty >= 40) {
      nexty = 40;
      this.vel.y = 0;
      this.isGrounded = true;
      this.isJumping  = false;
    }

    this.dst.x = nextx;
    this.dst.y = nexty;

    if (this.#invTimer <= 0) {
      EntityHandler.enemies.forEach(e => {
        if (this.dst.intersects(e.dst)) {
          let damage = e.stats.atk - this.stats.def;

          if (damage <= 0) damage = 1;

          this.stats.hp -= damage;

          this.#invTimer = this.#invDelay;

          if (this.stats.hp <= 0)
            console.log("GAME OVER");
        }
      });
    }
    else this.#invTimer -= dt;

    this.#weapon.update(this, dt);
    this.animate(dt);
  }

  draw() {
    super.draw();
    this.#weapon.draw();
  }

  levelUp() {
    this.expNext = 10 + 5 * this.level * (this.level - 1);
    ++this.level;
    this.incStats();

    Skin.setLevel(this.level);
  }
};