import Entity from "../../Entity";
import Skin   from "../../../gfx/ui/Skin";

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