import { GAME_WIDTH } from "../../../../game/constants";
import { GRAVITY } from "../../../../math/constants";
import EntityHandler from "../../../../utils/EntityHandler";
import Paw from "../../bullet/paw/Paw";
import Enemy from "../Enemy";

export default class BossCat extends Enemy {
  #fireDelay; // Delay time to fire paw
  #fireTimer; // Timer for firing delay

  constructor() {
    super(104, -16);

    this.src.set(80, 64, 16, 16);
    this.dst.dim.set(16, 16);

    this.#fireDelay = 1;
    this.#fireTimer = 0;

    this.dir.set(0, 1);
    this.vel.set(0, 30);

    this.exp = 80;

    this.state = 0;

    this.invTimer = 2;
    this.invDelay = 0.5;

    this.stats.hp    = 80;
    this.stats.maxHp = 80;
    this.stats.atk   = 10;
  }

  init() {}

  update(dt) {
    // Come into viewport
    if (this.state === 0) {
      this.vel.y += GRAVITY * dt;
      let nexty = this.dst.y + this.vel.y * this.dir.y * dt;

      if (nexty >= 48 - this.dst.h) {
        nexty = 48 - this.dst.h;
        this.state = 1;
      }

      this.dst.y = nexty;
    }
    // Boss introduction
    else if (this.state === 1) {
      this.state = 2;
      this.invTimer = 0;
    }
    // Attack
    else if (this.state === 2) {
      this.#fireTimer += dt;

      if (this.#fireTimer >= this.#fireDelay) {
        this.#fireTimer = 0;
        this.invTimer = 0; // Allow for at least one attack

        const healthPercent = this.stats.hp / this.stats.maxHp;

        if (healthPercent >= 0.80) {
          EntityHandler.add(
          new Paw(
            0, 8,
            1,
            EntityHandler.getPlayer(0),
            8,
            20
          ));
        }
        else if (healthPercent >= 0.70) {
          this.#fireDelay = 0.8;
          EntityHandler.add(
          new Paw(
            0, 8,
            2,
            EntityHandler.getPlayer(0),
            10,
            40
          ));
        }
        else if (healthPercent >= 0.60) {
          this.#fireDelay = 0.7;
          EntityHandler.add(
          new Paw(
            GAME_WIDTH, 8,
            2,
            EntityHandler.getPlayer(0),
            10,
            40
          ));
          EntityHandler.add(
          new Paw(
            0, 8,
            2,
            EntityHandler.getPlayer(0),
            10,
            40
          ));
        }
        else if (healthPercent >= 0.50) {
          this.#fireDelay = 0.5;
          EntityHandler.add(
          new Paw(
            GAME_WIDTH, 8,
            2,
            EntityHandler.getPlayer(0),
            12,
            50
          ));
          EntityHandler.add(
          new Paw(
            0, 8,
            2,
            EntityHandler.getPlayer(0),
            12,
            50
          ));
        }
        else {
          this.#fireDelay = 0.4;
          EntityHandler.add(
          new Paw(
            GAME_WIDTH, 8,
            2,
            EntityHandler.getPlayer(0),
            14,
            50
          ));
          EntityHandler.add(
          new Paw(
            GAME_WIDTH, 8,
            2,
            EntityHandler.getPlayer(0),
            18,
            50
          ));
          EntityHandler.add(
          new Paw(
            0, 8,
            2,
            EntityHandler.getPlayer(0),
            13,
            60
          ));
          EntityHandler.add(
          new Paw(
            0, 8,
            2,
            EntityHandler.getPlayer(0),
            21,
            60
          ));
        }
      }

      if (this.isHurt) {
        this.isHurt = false;
        this.state = 3;
        this.invTimer = 3;
        this.src.x +=16;
      }
    }
    // Hurt animation
    else if (this.state === 3) {
      this.invTimer -= dt;

      if (this.invTimer <= 0) {
        this.invTimer = 1;
        this.state = 2;
        this.src.x -= 16;
      }
    }
  }
};