/**
 * Represents a Golem enemy in the game.
 */
class Golem extends MovableObject {
  /**
   * The sound played when the Golem is hurt.
   * @type {Audio}
   */
  golemHurt_sound = new Audio('audio/golemHurt.mp3');

  /**
   * The sound played when the Golem dies.
   * @type {Audio}
   */
  golemDied_sound = new Audio('audio/golemDied.mp3');

  /**
   * Indicates whether the sound for Golem's death has been played.
   * @type {boolean}
   */
  golemDeadSoundPlayed = false;

  /**
   * The offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 80,
    left: 30,
    right: 50,
    bottom: 85,
  };

  /**
   * The array of image paths for Golem walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_001.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_002.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_003.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_004.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_005.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_006.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_007.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_008.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_009.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_010.png",
    "img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_011.png",
  ];

  /**
   * The array of image paths for Golem hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_000.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_001.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_002.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_003.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_004.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_005.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_006.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_007.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_008.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_009.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_010.png",
    "img/Golem_1/PNG/PNG Sequences/Hurt/0_Golem_Hurt_011.png",
  ];

  /**
   * The array of image paths for Golem dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/Golem_1/PNG/PNG Sequences/Dying/0_Golem_Dying_014.png"];

  /**
   * Indicates whether the Golem is hurt.
   * @type {boolean}
   */
  isHurt = false;

  /**
   * The number of lives the Golem has.
   * @type {number}
   */
  golemLive = 5;

  /**
   * Constructs a new Golem object.
   */
  constructor() {
    super();
    if (this.golemLive === 0) {
      this.loadImage("img/Golem_1/PNG/PNG Sequences/Dying/0_Golem_Dying_014.png");
    } else {
      this.loadImage("img/Golem_1/PNG/PNG Sequences/Running/0_Golem_Running_001.png");
    }
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 700 + Math.random() * 2700;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Handles the Golem's hurt state.
   */
  golemHurt() {    
    if (this.golemLive > 0) {
      this.golemLive = this.golemLive - 1;
    }
    this.isHurt = true;
    setTimeout(() => {
      this.isHurt = false;
    }, 1000);
  }

  /**
   * Animates the Golem's movement and state changes.
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.golemLive == 0) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (this.golemLive === 0) {
        this.handleDeadState();
      } else if (this.isHurt) {
        this.handleHurtState();
      } else {
        this.handleWalkingState();
      }
    }, 1000 / 10);
  }

  /**
   * Handles the Golem's dead state.
   */
  handleDeadState() {
    this.playDeadAnimation();
    if (!isMuted && !this.golemDeadSoundPlayed) {
      this.playGolemDeadSound();
      this.golemDeadSoundPlayed = true;
    }
  }
  
  /**
   * Handles the Golem's hurt state.
   */
  handleHurtState() {
    this.playHurtAnimation();
    if (!isMuted) {
      this.playGolemHurtSound();
    }
  }
  
  /**
   * Handles the Golem's walking state.
   */
  handleWalkingState() {
    this.playWalkingAnimation();
  }
  
  /**
   * Plays the Golem's dead animation.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }
  
  /**
   * Plays the Golem's hurt animation.
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }
  
  /**
   * Plays the Golem's walking animation.
   */
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }
  
  /**
   * Plays the sound of the Golem's death.
   */
  playGolemDeadSound() {
    this.golemDied_sound.play();
  }
  
  /**
   * Plays the sound of the Golem being hurt.
   */
  playGolemHurtSound() {
    this.golemHurt_sound.play();
  }
}
