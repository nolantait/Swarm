Crafty.s('Smell', {
  events: {
    UpdateFrame(eventData) {
      Crafty('Ant').each(function(index) {
        if (this.smellTimer <= 0) {
          const goalStrength = 1 / this.goalSmellWeight();

          Crafty.e(this.smellType())
            .attr({
              w: 2,
              h: 2,
              x: this.x,
              y: this.y,
            })
            .color(this.color())
            .withStrength(goalStrength * 100);

          this.smellTimer = Crafty.math.randomInt(5000, 15000);
        }

        this.smellTimer -= eventData.dt;
      });

      Crafty('Smell').each(function(index) {
        const decay = eventData.dt * this.baseDecayRate;

        if (this.currentStrength < 0) {
          this.destroy();
        }

        this.currentStrength -= decay;
        this.color(this.color(), this.currentStrength);
      });
    },
  }
});
