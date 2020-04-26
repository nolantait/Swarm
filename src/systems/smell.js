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

          this.smellTimer = Crafty.math.randomInt(2000, 5000);
        }

        this.smellTimer -= eventData.dt;
      });
    },
  }
});
