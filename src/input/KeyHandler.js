let instance = null;

class _KeyHandler {
  #keys; // Holds keys

  constructor() {
    if (instance) throw new Error("KeyHandler singleton reconstructed");

    this.#keys = [];

    onkeydown = this.#keydown.bind(this);
    onkeyup   = this.#keyup.bind(this);

    instance = this;
  }

  /**
   * @brief Handles keydown events
   *
   * @param {KeyboardEvent} e - Key board event object
   */
  #keydown(e) {
    e.preventDefault();

    switch(e.code) {
      case "KeyW":
      case "ArrowUp":
        this.#keys["up"]    = true;
        break;
      case "KeyS":
      case "ArrowDown":
        this.#keys["down"]  = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.#keys["left"]  = true;
        break;
      case "KeyD":
      case "ArrowRight":
        this.#keys["right"] = true;
        break;
    }
  }

  /**
   * @brief Handles keyup events
   *
   * @param {KeyboardEvent} e - Key board event object
   */
  #keyup(e) {
    e.preventDefault();

    switch(e.code) {
      case "KeyW":
      case "ArrowUp":
        this.#keys["up"]    = false;
        break;
      case "KeyS":
      case "ArrowDown":
        this.#keys["down"]  = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.#keys["left"]  = false;
        break;
      case "KeyD":
      case "ArrowRight":
        this.#keys["right"] = false;
        break;
    }
  }

  /**
   * @brief Get down status of a key
   *
   * @param {String} code - Key code
   *
   * @returns True if key is down; false otherwise
   */
  isDown(code) {
    return this.#keys[code] || false;
  }
};

const KeyHandler = new _KeyHandler;
export default KeyHandler;