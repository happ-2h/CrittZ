let instance = null;

class _TextureHandler {
  #textures; // Holds all textures

  constructor() {
    if (instance) throw new Error("TextureHandler singleton reconstructed");

    this.#textures = [];

    instance = this;
  };

  /**
   * @brief Loads a texture
   *
   * @param {String} textureID - ID to assign to the texture
   * @param {String} filename  - File name of the texture
   *
   * @returns Resolve if texture successfully loaded; reject otherwise
   */
  load(textureID="", filename="") {
    return new Promise((res, rej) => {
      if (this.#textures[textureID]) this.#textures[textureID] = null;

      this.#textures[textureID]         = new Image();
      this.#textures[textureID].onerror = () => rej(`Failed to load ${filename}`);
      this.#textures[textureID].onload  = () => res(`${filename} loaded`);
      this.#textures[textureID].src     = `res/img/${filename}`;
    });
  }

  /**
   * @brief Get the texture mapped to the given ID
   *
   * @param {String} textureID - ID of the texture
   *
   * @returns Texture assigned to the ID
   */
  getTexture(textureID) {
    return this.#textures[textureID];
  }
};

const TextureHandler = new _TextureHandler;
export default TextureHandler;