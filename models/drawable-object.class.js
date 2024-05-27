/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
  /**
   * The x-coordinate of the drawable object.
   * @type {number}
   */
  x = 120;

  /**
   * The y-coordinate of the drawable object.
   * @type {number}
   */
  y = 250;

  /**
   * The height of the drawable object.
   * @type {number}
   */
  height = 100;

  /**
   * The width of the drawable object.
   * @type {number}
   */
  width = 100;

  /**
   * The image of the drawable object.
   * @type {Image}
   */
  img;

  /**
   * Cache for loaded images.
   * @type {Object.<string, Image>}
   */
  imageCache = {};

  /**
   * The index of the current image in the cache.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Loads an image from the given path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the drawable object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the drawable object, if it's a character or a golem.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Golem) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Loads images from an array of paths into the image cache.
   * @param {string[]} arr - Array of paths to the images.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}

/**
 * Array to store interval IDs for stoppable intervals.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Sets a stoppable interval.
 * @param {function} fn - The function to be executed.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Stops the game by clearing all interval IDs.
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
}
