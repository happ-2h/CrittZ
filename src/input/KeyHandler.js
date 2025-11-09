let instance = null;

class _KeyHandler {
  #keys; // Holds keys

  #pressedKeys; // Holds keys for checking a single press
  #newKeys;     // New keys for determining a single press

  constructor() {
    if (instance) throw new Error("KeyHandler singleton reconstructed");

    this.#keys = [];

    this.#pressedKeys = {};
    this.#newKeys     = [];

    onkeydown = this.#keydown.bind(this);
    onkeyup   = this.#keyup.bind(this);

    instance = this;
  }

  /**
   * @brief Handles keydown events
   *
   * @param {KeyboardEvent} e - Keyboard event object
   */
  #keydown(e) {
    e.preventDefault();

    switch(e.code) {
      case "KeyW":
      case "ArrowUp":
        this.#keys["up"] = true;

        if (!this.#pressedKeys["up"]) this.#newKeys.push("up");
        this.#pressedKeys["up"] = true;
        break;
      case "KeyS":
      case "ArrowDown":
        this.#keys["down"] = true;

        if (!this.#pressedKeys["down"]) this.#newKeys.push("down");
        this.#pressedKeys["down"] = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.#keys["left"] = true;

        if (!this.#pressedKeys["left"]) this.#newKeys.push("left");
        this.#pressedKeys["left"] = true;
        break;
      case "KeyD":
      case "ArrowRight":
        this.#keys["right"] = true;

        if (!this.#pressedKeys["right"]) this.#newKeys.push("right");
        this.#pressedKeys["right"] = true;
        break;

      case "KeyZ":
        this.#keys["ActionA"] = true;

        if (!this.#pressedKeys["ActionA"]) this.#newKeys.push("ActionA");
        this.#pressedKeys["up"] = true;
        break;
      case "KeyX":
        this.#keys["ActionB"] = true;

        if (!this.#pressedKeys["ActionB"]) this.#newKeys.push("ActionB");
        this.#pressedKeys["ActionB"] = true;
        break;
    }
  }

  /**
   * @brief Handles keyup events
   *
   * @param {KeyboardEvent} e - Keyboard event object
   */
  #keyup(e) {
    e.preventDefault();

    switch(e.code) {
      case "KeyW":
      case "ArrowUp":
        this.#keys["up"] = false;
        this.#pressedKeys["up"] = false;
        break;
      case "KeyS":
      case "ArrowDown":
        this.#keys["down"] = false;
        this.#pressedKeys["down"] = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.#keys["left"] = false;
        this.#pressedKeys["left"] = false;
        break;
      case "KeyD":
      case "ArrowRight":
        this.#keys["right"] = false;
        this.#pressedKeys["right"] = false;
        break;

      case "KeyZ":
        this.#keys["ActionA"] = false;
        this.#pressedKeys["ActionA"] = false;
        break;
      case "KeyX":
        this.#keys["ActionB"] = false;
        this.#pressedKeys["ActionB"] = false;
        break;
    }
  }

  /**
   * @brief Get the down status of a key
   *
   * @param {String} code - Key code
   *
   * @returns True if key is down; false otherwise
   */
  isDown(code) {
    return this.#keys[code] || false;
  }

  /**
   * @credit https://github.com/saantonandre
   *
   * @brief Resets stored new keys
   */
  #reset() {
    this.#newKeys.length = 0;
  }

  /**
   * @credit https://github.com/saantonandre
   *
   * @brief Checks if a key was pressed (not held)
   *
   * @param {String} code - Key code
   *
   * @returns True if key has been pressed; false otherwise
   */
  isPressed(code) {
    return this.#newKeys.includes(code);
  }

  /**
   * @brief Updates the key status
   */
  update() {
    this.#reset();
  }
};

const KeyHandler = new _KeyHandler;
export default KeyHandler;