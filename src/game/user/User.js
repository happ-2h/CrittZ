/**
 * @note Only one user for now
 */
let instance = null;

class _User {
  #money;     // Total money accumulated
  #purchases; // Bit array of purchased content from the shop

  constructor() {
    if (instance) throw new Error("User singleton reconstructed");

    this.#money     = 0;
    this.#purchases = 0;

    instance = this;
  }

  // Accessors
  get money()     { return this.#money; }
  get purchases() { return this.#purchases; }

  // Mutators
  set money(m)     { this.#money     = m; }
  set purchases(p) { this.#purchases = p; }
};

const User = new _User;
export default User;
