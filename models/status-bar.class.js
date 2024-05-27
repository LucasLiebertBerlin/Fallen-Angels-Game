/**
 * Represents a status bar in the game.
 */
class StatusBar extends DrawableObject {
  /**
   * The percentage value of the status bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * The array of image paths for the status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/bars/life/lifebar_dead-removebg-preview.png",
    "img/bars/life/lifebar1-removebg-preview.png",
    "img/bars/life/lifebar2-removebg-preview.png",
    "img/bars/life/lifebar3-removebg-preview.png",
    "img/bars/life/lifebar4-removebg-preview.png",
    "img/bars/life/lifebar5-removebg-preview.png",
  ];

  /**
   * Constructs a new StatusBar object.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 20;
    this.width = 120;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage value of the status bar and updates its image.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the current percentage value.
   * @returns {number} The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 40) {
      return 1;
    } else {
      return 0;
    }
  }
}
