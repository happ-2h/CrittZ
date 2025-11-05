import Map from "../map/Map";

let instance = null;

class _MapHandler {
  #maps; // Holds all maps

  constructor() {
    if (instance) throw new Error("MapHandler singleton reconstructed");

    this.#maps = [];

    instance = this;
  }

  /**
   * @brief Loads a map
   *
   * @param {String} textureID - ID to assign to the map
   * @param {String} filename  - File name of the map
   *
   * @returns Resolve if map successfully loaded; reject otherwise
   */
  load(mapID="", filename="") {
    return new Promise((res, rej) => {
      if (this.#maps[mapID]) this.#maps[mapID] = null;

      fetch(`res/map/${filename}`)
        .then(val => val.json())
        .then(data => {
          this.#maps[mapID] = new Map(data);
          res(`${filename} loaded`);
        })
        .catch(err => rej(err));
    });
  }

  /**
   * @brief Get the map assigned to the given ID
   *
   * @param {String} mapID - ID of the map
   *
   * @returns Map assigned to the ID
   */
  getMap(mapID="") {
    return this.#maps[mapID];
  }
};

const MapHandler = new _MapHandler;
export default MapHandler;