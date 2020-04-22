import Game from '../game';

Crafty.c('Ant', {
  _speed: 16,
  required: 'Actor, Motion',
  init() {
    this.origin('center');
    this.attr({
      z: 2,
    });
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
    this.attr({
      rotation: 30,
    })
  },

  standingOnFood() {
    const area = this.pos();
    const results = [];
    Crafty.map.search(area, results);
    const filteredResults = results.filter((entity) => entity.has('Food'));

    if (filteredResults.length === 0) {
      return false;
    }

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
    },
  },
});
