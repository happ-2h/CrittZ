import State from "../game/state/State";

let instance = null;

class _StateHandler {
  #states; // State container

  constructor() {
    if (instance) throw new Error("StateHandler singleton reconstructed");

    this.#states = [];

    instance = this;
  }

  /**
   * @brief Pushes a state to the state stack
   *
   * @note Calls the onEnter method of the state
   *
   * @param {State} state - State to process
   */
  push(state) {
    if (state instanceof State) {
      state.onEnter();
      this.#states.push(state);
    }
  }

  /**
   * @brief Pops the current state off the state stack
   *
   * @note Calls the onExit method of the state
   */
  pop() {
    this.#states.pop()?.onExit();
  }

  /**
   * @brief Calls the init method of the state at the top of the stack
   */
  init() {
    this.#states.at(-1)?.init();
  }

  /**
   * @brief Calls the update method of the state at the top of the stack
   */
  update(dt) {
    this.#states.at(-1)?.update(dt);
  }

  /**
   * @brief Calls the render method of the state at the top of the stack
   */
  render() {
    this.#states.at(-1)?.render();
  }
};

const StateHandler = new _StateHandler;
export default StateHandler;