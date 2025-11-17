import Entity from "../Entity";

export default class Weapon extends Entity {
  #level; // Weapon's upgrade level

  constructor(x=0, y=0) {
    super(x, y);

    this.#level = 1;
  }

  // Mutators
  set level(l) { this.#level = l; }

  // Accessors
  get level() { return this.#level; }
};