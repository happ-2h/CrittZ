export default class Vec2D {
  #x;
  #y;

  constructor(x=0, y=0) {
    this.#x = x;
    this.#y = y;
  }

  /**
   * @returns A new (0, 0) vector
   */
  static zero() { return new Vec2D(0, 0); }

  /**
   * @brief Performs subtraction on the provided vectors
   *
   * @param {Vec2D} v1 - Vector as minuend
   * @param {Vec2D} v2 - Vector as subtrahend
   *
   * @returns  New vector with the difference of properties
   */
  static sub(v1, v2) {
    return new Vec2D(v1.x - v2.x, v1.y - v2.y);
  }

  /**
   * @brief Create a vector from the given angle
   *
   * @param {Number} angle - Angle in radians
   *
   * @returns New vector
   */
  static angToVec(angle) {
    return new Vec2D(Math.cos(angle), Math.sin(angle));
  }

  /**
   * @brief Scales a vector by the given n scalar
   *
   * @param {Number} n - Scalar value
   */
  scale(n=1) {
    this.#x *= n;
    this.#y *= n;
  }

  /**
   * @brief Normalizes the vector
   */
  normalize() {
    const len = this.length;

    if (len === 0) return;

    this.#x /= len;
    this.#y /= len;
  }

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

  get length() {
    return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
  }

  //Mutators
  set x(x) { this.#x = x; }
  set y(y) { this.#y = y; }

  //Accessors
  get x() { return this.#x; }
  get y() { return this.#y; }
};