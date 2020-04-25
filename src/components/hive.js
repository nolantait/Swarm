Crafty.c('Hive', {
  required: 'Actor',
  init() {
    this._food = 0;
    this.defineField("food", function() {
      return this._food;
    }, function(newValue) {
      this._food = newValue;
      if (this._food >= 5) {
        console.log('MAKE SHIT');
        Crafty.e('Ant, TeamAssignment, Gathering')
          .attr({ x: this.x, y: this.y, w: 5, h: 5 })
          .color(this.color());
        this._food = 0;
      }
    });
  }
});
