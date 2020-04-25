import Game from '../game';

Crafty.c('Food', {
  required: 'Actor',
  init() {
    this._food = 0;
    this.defineField("food", function() {
      return this._food;
    }, function(newValue) {
      if (newValue <= 0) {
        this.destroy();
      }
      this.with(newValue);
    });
  },

  with(food) {
    this._food = food;
    this.h = (food / 25) * Game.tile.height;
    this.w = (food / 25) * Game.tile.width;

    return this;
  },
});
