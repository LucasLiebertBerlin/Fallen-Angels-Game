/**
 * Represents the game world.
 */
class World {
  character = new Character(); // The main character.
  golem = new Golem(); // The enemy golem.
  endboss = new Endboss(); // The end boss.
  statusBar = new StatusBar(); // The status bar for health.
  fireStatusBar = new FireStatusBar(); // The status bar for fire energy.
  world_sound = new Audio("audio/world_music.mp3"); // Background music for the world.
  equip_sound = new Audio("audio/pop.mp3"); // Sound effect for equipping items.
  fireball_sound = new Audio("audio/fireball.mp3"); // Sound effect for firing a fireball.
  win_sound = new Audio("audio/aggressive-huge-hit-logo-139134.mp3"); // Sound effect for winning the game.
  throwableObjects = []; // Array to store throwable objects.
  level = level1; // The current game level.
  camera_x = 0; // Camera position along the x-axis.
  keyboard; // The keyboard controller.
  canvas; // The canvas element.
  ctx; // The canvas rendering context.

  /**
   * Constructs a new World object.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard controller.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    if (!isMuted) {
      this.world_sound.play();
    }
    this.FillUpFireItemAfterTime();
    this.FillUpLiveItemAfterTime();
    this.world_sound.loop = true;
  }

  /**
   * Sets the world property of the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop.
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionsWithFlame();
      this.checkCollisionsWithFireItem();
      this.checkCharacterPosition();
    }, 200);
  }

  /**
   * Checks if the character throws objects and handles the collision with enemies.
   */
  checkThrowObjects() {
    if (this.keyboard.F && this.fireStatusBar.percentage > 0) {
      if (this.fireStatusBar.percentage >= 10) {
        this.fireStatusBar.setPercentage(this.fireStatusBar.percentage - 10);
      }
      let flame = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
      this.throwableObjects.push(flame);
      if (!isMuted) {
        this.fireball_sound.play();
      }
    }
  }

  /**
   * Checks collisions between the character and enemies, handles character hits, and updates the status bar.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.golemLive > 0 && this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks collisions between throwable objects (flames) and enemies, and handles enemy hurt states.
   */
  checkCollisionsWithFlame() {
    this.throwableObjects.forEach((flame) => {
      this.level.enemies.forEach((enemy) => {
        if (flame.isColliding(enemy)) {
          enemy.golemHurt();
        }
      });
    });
  }

  /**
   * Checks collisions between the character and fire items, and updates the fire status bar accordingly.
   */
  checkCollisionsWithFireItem() {
    if (this.fireStatusBar.percentage < 120) {
      for (let i = 0; i < this.level.items.length; i++) {
        const item = this.level.items[i];
        if (this.character.isColliding(item)) {
          this.fireStatusBar.setPercentage(this.fireStatusBar.percentage + 10);
          this.level.items.splice(i, 1);
          i--;
          if (!isMuted) {
            this.equip_sound.play();
          }
        }
      }
    }
  }

  /**
   * Checks the character's position and sets a flag if the character is near the end boss.
   */
  checkCharacterPosition() {
    setStoppableInterval(() => {
      if (this.character.x > 1000) {
        this.endboss.nearByCharacter = true;
      }
    }, 3000);
  }

  /**
   * Refills the fire item over time.
   */
  FillUpFireItemAfterTime() {
    setStoppableInterval(() => {
      if (this.fireStatusBar.percentage < 120) {
        this.fireStatusBar.setPercentage(this.fireStatusBar.percentage + 10);
      }
    }, 3000);
  }

  /**
   * Refills the live item over time.
   */
  FillUpLiveItemAfterTime() {
    setStoppableInterval(() => {
      if (this.statusBar.percentage < 100) {
        this.statusBar.setPercentage(this.statusBar.percentage + 5);
      }
    }, 1000);
  }

  /**
   * Draws all objects onto the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.items);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    // ------------ space for fixed objecs -----------
    this.addToMap(this.statusBar);
    this.addToMap(this.fireStatusBar);
    this.ctx.translate(this.camera_x, 0); 
    this.ctx.translate(-this.camera_x, 0);
    this.animateDraw();
  }

  /**
   * Animates the drawing by continuously calling the draw method.
   */
  animateDraw() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map.
   * @param {Object} mo - The object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally.
   * @param {Object} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped image to its original state.
   * @param {Object} mo - The object whose image is to be restored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}


