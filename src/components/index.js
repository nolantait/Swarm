import Game from '../game';

// Allows an element to be located on the grid
Crafty.c('Grid', {
  init() {
    this.attr({
      w: Game.tile.width,
      h: Game.tile.height,
    });
  },

  at(x, y) {
    this.attr({
      x: x * Game.tile.width,
      y: y * Game.tile.height,
    });
    return this;
  },
});

// Allows an entity to be drawn on the canvas grid
Crafty.c('Actor', {
  required: '2D, Canvas, Grid, Color',
});

Crafty.c('Ant', {
  _speed: 0.5,
  required: 'Actor',
  events: {
    'UpdateFrame': function() {
      this.x += Math.random() < 0.5 ? -this._speed : this._speed;
      this.y += Math.random() < 0.5 ? -this._speed : this._speed;
    },
  },
});

Crafty.c('Team', {
  required: 'Color',

  init() {
    this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  },
});

Crafty.c('TeamAssignment', {
  required: 'Color',

  init() {
  },

  assign(team) {
    this.teamId = team.getId();
    return this;
  },
});
