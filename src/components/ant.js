import StateMachine from 'javascript-state-machine';
import Game from '../game';

Crafty.c('Ant', {
  _speed: 16,
  required: 'Actor, Motion',
  init() {
    this.origin('center');
    this.smellRange = Game.tile.width * 5;
    this.food = 0;
    this.lastSmell = this.pos();
    this.smellTimer = 1000;
    this.currentHive = undefined;
    this.currentFood = undefined;
    const self = this;
    this.state = new StateMachine({
      init: 'gathering',
      transitions: [
        { name: 'deposit', from: 'gathering', to: 'depositing' },
        { name: 'gather', from: 'depositing', to: 'gathering' },
      ],
      methods: {
        onDeposit() {
          self.removeComponent('Gathering');
          self.addComponent('Depositing');
        },
        onGather() {
          self.removeComponent('Depositing');
          self.addComponent('Gathering');
        },
      },
    });
  },

  goalSmellWeight() {
    if (this.state.is('depositing') && this.currentFood !== undefined) {
      return Crafty.math.clamp(
        Crafty.math.distance(this.x, this.y, this.currentFood.x, this.currentFood.y),
        0.01,
        100,
      );
    }

    if (this.state.is('gathering') && this.currentHive !== undefined) {
      return Crafty.math.clamp(
        Crafty.math.distance(this.x, this.y, this.currentHive.x, this.currentHive.y),
        0.01,
        100,
      );
    }

    return Math.random() * 100;
  },

  perceptionSpace() {
    return {
      _x: this.x - this.smellRange,
      _y: this.y - this.smellRange,
      _h: this.smellRange * 2,
      _w: this.smellRange * 2,
    };
  },

  smellType() {
    if (this.state.is('depositing')) {
      return 'FoodSmell';
    }

    return 'HiveSmell';
  },

  moveTo(target) {
    const initialVector = new Crafty.math.Vector2D(
      this.x,
      this.y,
    );
    const targetVector = new Crafty.math.Vector2D(
      target.x,
      target.y,
    );

    const subVector = targetVector.subtract(initialVector).scaleToMagnitude(2);
    const velocity = this.velocity();

    velocity.x = Crafty.math.clamp((velocity.x + subVector.x), -this._speed, this._speed);
    velocity.y = Crafty.math.clamp((velocity.y + subVector.y), -this._speed, this._speed);
  },

  standingOnFood() {
    const area = this.pos();
    const results = [];
    Crafty.map.search(area, results);
    const filteredResults = results.filter((entity) => entity.has('Food'));

    if (filteredResults.length === 0) {
      return false;
    }

    this.currentFood = filteredResults[0];
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
    this.currentHive = filteredResults[0];
    return true;
  },
  hasFood() {
    return (this.food > 0);
  },
  events: {
    UpdateFrame() {
      if (this.standingOnFood()) {
        if (!this.hasFood()) {
          if (this.state.is('gathering')) {
            this.food += 1
            this.currentFood.food = this.currentFood.food - 1;
            this.state.deposit();
          }
        }
      }

      if (this.standingOnHive()) {
        if (this.hasFood()) {
          if (this.state.is('depositing')) {
            this.food -= 1;
            this.currentHive.food = this.currentHive.food + 1;
            this.state.gather();
          }
        }
      }
    },
  },
});
