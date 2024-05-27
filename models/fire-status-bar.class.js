/**
 * Represents a fire status bar in the game.
 */
class FireStatusBar extends DrawableObject {
  /**
   * The percentage of the fire status bar.
   * @type {number}
   */
  percentage = 0;

  /**
   * The array of image paths for different percentage levels of the fire status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/bars/fireStatusbar/fireStatusBar.0.png",
    "img/bars/fireStatusbar/fireStatusBar.1.png",
    "img/bars/fireStatusbar/fireStatusBar.2.png",
    "img/bars/fireStatusbar/fireStatusBar.3.png",
    "img/bars/fireStatusbar/fireStatusBar.4.png",
    "img/bars/fireStatusbar/fireStatusBar.5.png",
    "img/bars/fireStatusbar/fireStatusBar.6.png",
    "img/bars/fireStatusbar/fireStatusBar.7.png",
    "img/bars/fireStatusbar/fireStatusBar.8.png",
    "img/bars/fireStatusbar/fireStatusBar.9.png",
    "img/bars/fireStatusbar/fireStatusBar.10.png",
    "img/bars/fireStatusbar/fireStatusBar.11.png",
    "img/bars/fireStatusbar/fireStatusBar.12.png",
  ];

  /**
   * Constructs a new FireStatusBar object.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 55;
    this.width = 500;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of the fire status bar.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage; 
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the current percentage.
   * @returns {number} - The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage >= 120) {
      return 12;
    } else if (this.percentage >= 110) {
      return 11;
    } else if (this.percentage >= 100) {
      return 10;
    } else if (this.percentage >= 90) {
      return 9;
    } else if (this.percentage >= 80) {
      return 8;
    } else if (this.percentage >= 70) {
      return 7;
    } else if (this.percentage >= 60) {
      return 6;
    } else if (this.percentage >= 50) {
      return 5;
    } else if (this.percentage >= 40) {
      return 4;
    } else if (this.percentage >= 30) {
      return 3;
    } else if (this.percentage >= 20) {
      return 2;
    } else if (this.percentage >= 10) {
      return 1;
    } else {
      return 0;
    }
  }
}
