/**
 * Represents a Keyboard object for handling touch controls.
 */
class Keyboard {
  /**
   * Indicates whether the left button is pressed.
   * @type {boolean}
   */
  LEFT = false;

  /**
   * Indicates whether the right button is pressed.
   * @type {boolean}
   */
  RIGHT = false;

  /**
   * Indicates whether the up button is pressed.
   * @type {boolean}
   */
  UP = false;

  /**
   * Indicates whether the down button is pressed.
   * @type {boolean}
   */
  DOWN = false;

  /**
   * Indicates whether the space button is pressed.
   * @type {boolean}
   */
  SPACE = false;

  /**
   * Indicates whether the 'F' button is pressed.
   * @type {boolean}
   */
  F = false;

  /**
   * Constructs a new Keyboard object and binds touch events to corresponding methods.
   */
  constructor() {
    this.bindBtnPressEvents();
  }

  /**
   * Binds touch events to corresponding touchstart and touchend methods for buttons.
   */
  bindBtnPressEvents() {
    document.getElementById("btnLeft").addEventListener("touchstart", this.handleTouchStartLeft);
    document.getElementById("btnLeft").addEventListener("touchend", this.handleTouchEndLeft);
    document.getElementById("btnRight").addEventListener("touchstart", this.handleTouchStartRight);
    document.getElementById("btnRight").addEventListener("touchend", this.handleTouchEndRight);
    document.getElementById("btnUp").addEventListener("touchstart", this.handleTouchStartUp);
    document.getElementById("btnUp").addEventListener("touchend", this.handleTouchEndUp);
    document.getElementById("btnThrow").addEventListener("touchstart", this.handleTouchStartThrow);
    document.getElementById("btnThrow").addEventListener("touchend", this.handleTouchEndThrow);
  }

  /**
   * Handles touch start event for the left button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchStartLeft = (e) => {
    e.preventDefault();
    this.LEFT = true;
  };

  /**
   * Handles touch end event for the left button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchEndLeft = (e) => {
    e.preventDefault();
    this.LEFT = false;
  };

  /**
   * Handles touch start event for the right button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchStartRight = (e) => {
    e.preventDefault();
    this.RIGHT = true;
  };

  /**
   * Handles touch end event for the right button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchEndRight = (e) => {
    e.preventDefault();
    this.RIGHT = false;
  };

  /**
   * Handles touch start event for the up button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchStartUp = (e) => {
    e.preventDefault();
    this.SPACE = true;
  };

  /**
   * Handles touch end event for the up button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchEndUp = (e) => {
    e.preventDefault();
    this.SPACE = false;
  };

  /**
   * Handles touch start event for the throw button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchStartThrow = (e) => {
    e.preventDefault();
    this.F = true;
  };

  /**
   * Handles touch end event for the throw button.
   * @param {TouchEvent} e - The touch event.
   */
  handleTouchEndThrow = (e) => {
    e.preventDefault();
    this.F = false;
  };
}
