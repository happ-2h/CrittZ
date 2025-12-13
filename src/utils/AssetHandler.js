import MapHandler     from "./MapHandler";
import TextureHandler from "./TextureHandler";

let instance = null;

class _AssetHandler {
  #imgs;   // Image pool
  #maps;   // Map pool

  #loaded; // Number of assets successfully loaded
  #toLoad; // Number of assets to load

  constructor() {
    if (instance) throw new Error("AssetHandler singleton reconstructed");

    this.#imgs = new Map();
    this.#maps = new Map();

    this.#loaded = 0;
    this.#toLoad = 0;

    instance = this;
  }

  /**
   * @brief Polls an asset for loading
   *
   * @param {String} assetID  - ID to give the asset
   * @param {String} filename - File name of the asset
   */
  poll(assetID="", filename="") {
    ++this.#toLoad;

    const ext = filename.split(".").pop().toLowerCase();

    switch(ext) {
      case "png":  this.#imgs.set(assetID, filename); break;
      case "json": this.#maps.set(assetID, filename); break;
      default:     --this.#toLoad;                    break;
    }
  }

  /**
   * @brief Load all polled assets
   *
   * @returns Resolve when all assets loaded successfully; Reject otherwise
   */
  load() {
    return new Promise((res, rej) => {
      this.#imgs.forEach((val, key) => {
        TextureHandler.load(key, val)
          .then(val  => this.#loadHandler(res))
          .catch(err => rej(err));
      });

      this.#maps.forEach((val, key) => {
        MapHandler.load(key, val)
          .then(val  => this.#loadHandler(res))
          .catch(err => rej(err));
      });
    });
  }

  /**
   * @brief Checks when all assets have been loaded
   *
   * @param {Resolve} res - Resolve function
   */
  #loadHandler(res) {
    ++this.#loaded >= this.#toLoad && res("Assets successfully loaded");
  }
};

const AssetHandler = new _AssetHandler;
export default AssetHandler;