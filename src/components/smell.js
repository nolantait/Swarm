Crafty.c('Smell', {
  required: '2D, Canvas, Grid, Color',

  init() {
    this.baseDecayRate = 0.0001;
  },

  withStrength(strength) {
    this.strength = strength;
  },

  events: {
    UpdateFrame(eventData) {
      const decay = eventData.dt * this.baseDecayRate;

      if (this.strength < 0.01) {
        this.destroy();
      }

      this.strength -= decay;
      this.color(this.color(), this.strength);
    },
  },
});
