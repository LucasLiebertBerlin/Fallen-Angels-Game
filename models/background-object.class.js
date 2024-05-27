/**
 * Represents a background object in the game, extending the MovableObject class.
 */
class BackgroundObject extends MovableObject {
    /**
     * Width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * Height of the background object.
     * @type {number}
     */
    height = 480;
    
    /**
     * Constructs a new BackgroundObject with the specified image path and x-coordinate.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
