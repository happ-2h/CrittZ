import Vec2D from "../math/Vec2D";

export default class Map {
  #dim;  // Map dimensions
  #data; // Map data

  constructor(data) {
    this.#dim  = new Vec2D(data.width, data.height);
    this.#data = [ ...data.layers[0].data ];
  }

  // Accessors
  get width()  { return this.#dim.x; }
  get height() { return this.#dim.y; }
  get data()   { return this.#data;  }
};