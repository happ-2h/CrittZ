import Entity from "../../Entity";

export default class Enemy extends Entity {
  #state; // State of the enemy

  constructor(x=0, y=0) {
    super(x, y);

    this.#state = 0;
    this.stats.hp = 1;
  }

  // Mutators
  set state(s) { this.#state = s; }

  // Accessors
  get state() { return this.#state; }
};