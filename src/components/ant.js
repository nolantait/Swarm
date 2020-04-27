import StateMachine from 'javascript-state-machine';
import Game from '../game';

Crafty.c('Ant', {
  _speed: 16,
  required: 'Actor, Motion, Collision, Combat',
  init() {
    this.origin('center');
    this.smellRange = Game.tile.width * 5;
    this.food = 0;
    this._health = 100;
    this.defineField('health', function() {
      return this._health;
    }, function(newValue) {
      this._health = newValue;
      if (this._health <= 0) {
        this.destroy();
      }
    });
    this.smellTimer = Crafty.math.randomInt(5000, 15000);
    this.currentHive = undefined;
    this.currentFood = undefined;
    const self = this;
    this.target = this.randomTarget();

    this.state = new StateMachine({
      init: 'gathering',
      transitions: [
        { name: 'deposit', from: 'gathering', to: 'depositing' },
        { name: 'deposit', from: 'attacking', to: 'depositing' },
        { name: 'gather', from: 'depositing', to: 'gathering' },
        { name: 'gather', from: 'attacking', to: 'gathering' },
        { name: 'attack', from: 'gathering', to: 'attacking' },
      ],
      methods: {
        onAttack() {
          self.removeComponent('Gathering');
          self.removeComponent('Depositing');
          self.addComponent('Attacking');
        },
        onDeposit() {
          self.removeComponent('Gathering');
          self.removeComponent('Attacking');
          self.addComponent('Depositing');
        },
        onGather() {
          self.removeComponent('Attacking');
          self.removeComponent('Depositing');
          self.addComponent('Gathering');
        },
      },
    });
  },

  ignoreRange() {
    return new Crafty.circle(this.x, this.y, 16);
  },

  avoidRange() {
    return new Crafty.circle(this.x, this.y, 64);
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

  randomTarget() {
    const xdiff = Crafty.math.negate(0.5) * (Game.tile.width * 10);
    const ydiff = Crafty.math.negate(0.5) * (Game.tile.height * 10);
    return {
      x: this.x + (Math.random() * xdiff),
      y: this.y + (Math.random() * ydiff),
    };
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

  hasFood() {
    return (this.food > 0);
  },

  attack(attackable) {
    attackable.health = attackable.health - (Math.random() * 100);
  },

  events: {
    UpdateFrame() {
      this.moveTo(this.target);
    },
    HitOn(eventData) {
      const self = this;
      const collisions = eventData.map((data) => data.obj);
      const enemies = collisions.filter((entity) => !(entity.isTeam(self.teamId)));

      if (enemies.length > 0) {
        const attackable = Crafty.math.randomElementOfArray(enemies);
        this.attack(attackable);
      }

      this.resetHitChecks('Ant');
    },
  },
});
