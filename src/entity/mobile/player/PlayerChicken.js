import StateShop from "../../../game/state/StateShop";
import Skin from "../../../gfx/ui/Skin";
import KeyHandler from "../../../input/KeyHandler";
import { GRAVITY } from "../../../math/constants";
import EntityHandler from "../../../utils/EntityHandler";
import StateHandler from "../../../utils/StateHandler";
import Shop from "../../pickup/Shop";
import Sword from "../../weapon/sword/Sword";
import Player from "./Player";

export default class PlayerChicken extends Player {
  constructor() {
    super();

    this.src.set(8, 0);

    this.weapon = new Sword(this.dst.x+8, this.dst.y);

    this.setFrames(1, 3);
  }

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

    if (nextx <= 8 + this.weapon.dst.w)
      nextx = 8 + this.weapon.dst.w;
    else if (nextx >= 112 - this.weapon.dst.w)
      nextx = 112 - this.weapon.dst.w;

    if (nexty >= 40) {
      nexty = 40;
      this.vel.y = 0;
      this.isGrounded = true;
      this.isJumping  = false;
    }

    this.dst.x = nextx;
    this.dst.y = nexty;

    if (this.invTimer <= 0) {
      EntityHandler.enemies.forEach(e => {
        if (this.dst.intersects(e.dst)) {
          let damage = e.stats.atk - this.stats.def;

          if (damage <= 0) damage = 1;

          this.stats.hp -= damage;

          this.invTimer = this.invDelay;

          Skin.setHealth(this.stats.hp, this.stats.maxHp);

          if (this.stats.hp <= 0)
            console.log("GAME OVER");
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

          if (this.stats.hp <= 0)
            console.log("GAME OVER");
        }
      });
    }
    else this.invTimer -= dt;

    EntityHandler.pickups.forEach(p => {
      if (this.dst.intersects(p.dst)) {
        if (p instanceof Shop)
          StateHandler.push(new StateShop("chicken"));

        this.money += p.value;
        Skin.setMoney(this.money);

        EntityHandler.remove(p);
      }
    });

    this.weapon.update(this, dt);
    this.animate(dt);
  }

  draw() {
    super.draw();
    this.weapon.draw();
  }
};