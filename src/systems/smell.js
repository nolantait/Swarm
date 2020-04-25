Crafty.s('Smell', {
  events: {
    UpdateFrame(eventData) {
      Crafty('Ant').each(function(index) {
        if (this.smellTimer >= 1000) {
          Crafty.e(this.smellType())
            .attr({
              w: 2,
              h: 2,
              x: this.x,
              y: this.y,
            })
            .color(this.color());
          this.smellTimer = 0;
        }
        this.smellTimer += eventData.dt;
      });
    },
  },
});
