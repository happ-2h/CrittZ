export default class Vec2D {
  #x;
  #y;

  constructor(x=0, y=0) {
    this.#x = x;
    this.#y = y;
  }

  /**
   *
   * @returns A new (0, 0) vector
   */
  static zero() { return new Vec2D(0, 0); }

  /**
   * @brief Sets new values for x and y
   *
   * @param {Number} x - New value for x
   * @param {Number} y - New value for y
   */
  set(x, y) {
    this.#x = x;
    this.#y = y;
  }

  //Mutators
  set x(x) { this.#x = x; }
  set x(y) { this.#y = y; }

  //Accessors
  get x() { return this.#x; }
  get y() { return this.#y; }
};