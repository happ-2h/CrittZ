/**
 * @note Only one user for now
 */
let instance = null;

class _User {
  #money; // Total money accumulated

  constructor() {
    if (instance) throw new Error("User singleton reconstructed");

    this.#money = 0;

    instance = this;
  }

  // Accessors
  get money() { return this.#money; }

  // Mutators
  set money(m) { this.#money = m; }
};

const User = new _User;
export default User;
