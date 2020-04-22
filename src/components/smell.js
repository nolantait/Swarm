import Game from '../game';

Crafty.c('Smell', {
  required: '2D, Canvas, Grid, Color, TeamAssignment',

  init() {
    this.strength = Math.random();
  },

  events: {
    UpdateFrame() {
      if (this.strength < 0.01) {
        this.destroy();
      }

      this.strength -= 0.0025;
      this.color(this.color(), this.strength);
    },
  },
});
