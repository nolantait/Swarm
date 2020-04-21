Crafty.c('Ant', {
  _speed: 0.5,
  required: 'Actor',
  standingOnFood() {
    const result = Crafty('Food')
      .toArray()
      .find((food) => food.x === this.x && food.y === this.y);

    if (result === undefined) {
      return false;
    }

    return result;
  },
  standingOnHive() {
    const result = Crafty('Hive')
      .toArray()
      .find((hive) => hive.x === this.x && hive.y === this.y);

    if (result === undefined) {
      return false;
    }

    return result;
  },
  hasFood() {
    return (this.food !== undefined);
  },
  pickUp() {
    this.food += 1;
  },
  dropOff() {
    this.food -= 1;
  },
  events: {
    UpdateFrame() {
      if (this.standingOnFood() !== undefined) {
        if (!this.hasFood()) {
          this.pickUp();
        }
      } else if (this.standingOnHive()) {
        if (this.hasFood()) {
          this.dropOff();
        }
      }

      const matrix = [
        [-1, 1],
        [0, 1],
        [1, 1],
        [-1, 0],
        [0, 0],
        [1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
      ];

      const probabilities = matrix.map(function(transform) {
        const result = Crafty('Smell').toArray().find((smell) => smell.x === (this.x + transform[0]) && smell.y === (this.y + transform[1]));
        if (result === undefined) {
          return Math.random();
        }

        return result.strength;
      });


      Crafty.e('Smell').at(this.x, this.y).setStrength(Math.random());

      let maxIndex = 0;
      let currentMax = 0;

      for (let i = 0; i < probabilities.length; i += 1) {
        if (probabilities[i] >= currentMax) {
          maxIndex = i;
          currentMax = probabilities[i];
        };
      };
    },
  },
});
