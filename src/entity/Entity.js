export default class Entity {
  constructor() {
    if (this.constructor === Entity)
      throw new Error("Cannot instantiate abstract class");

    if (this.init === undefined)
      throw new Error("init() must be implemented");
    if (this.update === undefined)
      throw new Error("update(dt) must be implemented");
    if (this.draw === undefined)
      throw new Error("draw() must be implemented");
  }
};