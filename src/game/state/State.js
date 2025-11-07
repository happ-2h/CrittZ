export default class State {
  constructor() {
    if (this.constructor === State)
      throw new Error("Cannot instantiate abstract class");

    if (this.onEnter === undefined)
      throw new Error("onEnter() must be implemented");
    if (this.onExit === undefined)
      throw new Error("onExit() must be implemented");

    if (this.init === undefined)
      throw new Error("init() must be implemented");
    if (this.update === undefined)
      throw new Error("update(dt) must be implemented");
    if (this.render === undefined)
      throw new Error("render() must be implemented");
  }
};