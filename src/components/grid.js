import Game from '../game';

// Allows an element to be located on the grid
Crafty.c('Grid', {
  init() {
    this.attr({
      w: Game.tile.width,
      h: Game.tile.height,
    });
  },

  at(x, y) {
    this.attr({
      x: x * Game.tile.width,
      y: y * Game.tile.height,
    });
    return this;
  },
});
