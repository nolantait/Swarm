Crafty.c('Smell', {
  required: '2D, Canvas, Grid, Color',

  init() {
    this.baseDecayRate = 0.0001;
  },

  withStrength(strength) {
    this.strength = strength;
    this.currentStrength = strength;
    this.color(this.color(), this.strength);
  },
});
