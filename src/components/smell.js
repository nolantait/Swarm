Crafty.c('Smell', {
  required: '2D, Canvas, Grid, Color, TeamAssignment',

  init() {
    this.attr({
      strength: Math.random(),
    });
  },
});
