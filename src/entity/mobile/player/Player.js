import Skin from "../../../gfx/ui/Skin";
import Entity from "../../Entity";

export default class Player extends Entity {
  #weapon; // Current weapon
  #money;  // Total of collected money

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

  // Accessors
  get weapon() { return this.#weapon; }
  get money()  { return this.#money;  }
};