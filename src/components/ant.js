import StateMachine from 'javascript-state-machine';
import Game from '../game';

Crafty.c('Ant', {
  _speed: 16,
  required: 'Actor, Motion',
  init() {
    this.origin('center');
    this.smellRange = 48;
    this.food = 0;
    this.lastSmell = this.pos();
    this.smellTimer = 0;
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
            console.log('DEPOSITING');
          }
        }
      }

      if (this.standingOnHive()) {
        if (this.hasFood()) {
          if (this.state.is('depositing')) {
            this.food -= 1;
            console.log(this.currentHive);
            this.currentHive.food = this.currentHive.food + 1;
            this.state.gather();
            console.log('GATHERING');
          }
        }
      }
    },
  },
});
