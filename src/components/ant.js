import Game from '../game';

Crafty.c('Ant', {
  _speed: 1,
  required: 'Actor',
  init() {
    this.origin('center');
    this.attr({
      z: 2,
    });
    this._direction = new Crafty.math.Vector2D();
    this.smellRange = 32;
    this.goal = 'Food';
    this.directions = [
      'n',
      'ne',
      'nw',
      'w',
      'e',
      'se',
      'sw',
      's',
    ];
  },

  standingOnFood() {
    const area = this.pos();
    const results = [];
    Crafty.map.search(area, results);
    const filteredResults = results.filter((entity) => entity.has('Food'));

    if (filteredResults.length === 0) {
      return false;
    }

    console.log('STANDING ON FOOD');
    return true;
  },
  standingOnHive() {
    const area = this.pos();
    const results = [];
    Crafty.map.search(area, results);
    const filteredResults = results.filter((entity) => entity.has('Hive'));

    if (filteredResults.length === 0) {
      return false;
    }
    console.log('STANDING ON HIVE');
    return true;
  },
  hasFood() {
    return (this.food > 0);
  },
  pickUp() {
    this.food += 1;
  },
  dropOff() {
    this.food -= 1;
  },
  events: {
    UpdateFrame() {
      if (this.standingOnFood()) {
        if (!this.hasFood()) {
          this.pickUp();
          this.goal = 'Hive';
        }
      }

      if (this.standingOnHive()) {
        if (this.hasFood()) {
          this.dropOff();
          this.goal = 'Food';
        }
      }

      const perceptionSpace = {
        _x: this.x - this.smellRange,
        _y: this.y - this.smellRange,
        _h: this.smellRange * 2,
        _w: this.smellRange * 2,
      };

      const results = [];
      Crafty.map.search(perceptionSpace, results);
      const filteredGoalResults = results.filter((entity) => entity.has(this.goal));
      const filteredSmellResults = results.filter((entity) => entity.has('Smell'));

      if (filteredGoalResults.length > 0) {
        const dir = this._direction;
        dir.setValues(
          filteredGoalResults[0].x - this.x,
          filteredGoalResults[0].y - this.y,
        );
        dir.scaleToMagnitude(this._speed);
        this.x += dir.x;
        this.y += dir.y;
      } else if (filteredSmellResults.length > 0 && this.goal === 'Hive') {
        const sortedResults = filteredSmellResults.sort((a, b) => b.strength - a.strength);

        const dir = this._direction;
        dir.setValues(
          sortedResults[0].x - this.x,
          sortedResults[0].y - this.y,
        );
        dir.scaleToMagnitude(this._speed);
        this.x += dir.x;
        this.y += dir.y;
      } else {
        this.move(
          Crafty.math.randomElementOfArray(this.directions),
          this._speed,
        );
        Crafty.e('Smell').attr({
          h: 1,
          w: 1,
        })
          .at(this.x / Game.tile.width, this.y / Game.tile.height)
          .color(this.color(), 1)
          .assign(Crafty('Team').get(this.team)[0]);
      }
    },
  },
});
