Crafty.c('FoodSmell', {
  required: '2D, Canvas, Grid, Color, TeamAssignment',

  init() {
    this.strength = Math.random();
  },

  events: {
    UpdateFrame(eventData) {
      const decay = eventData.dt * 0.0001;

      if (this.strength < 0.01) {
        this.destroy();
      }

      this.strength -= decay;
      this.color(this.color(), this.strength);
    },
  },
});
