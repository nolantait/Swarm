import Game from '../game';
import probability from '../utility';

Crafty.s('Gathering', {
  events: {
    UpdateFrame() {
      Crafty('Gathering').each(function(index) {
        this.target = this.randomTarget();

        if (probability(0.1)) {
          const self = this;
          const results = [];
          Crafty.map.search(this.perceptionSpace(), results);

          if (results.length > 0) {
            const food = results.filter((entity) => entity.has('Food'));
            const ants = results.filter((entity) => entity.has('Ant'));
            const sameTeam = ants.filter((entity) => entity.isTeam(self.teamId));
            const avoid = sameTeam.filter((entity) => {
              if (self.avoidRange().containsPoint(entity.x, entity.y)) {
                return true;
              }
              return false;
            });
            const smells = results.filter((entity) => entity.has('FoodSmell'));
            const filteredSmells = smells.filter((entity) => {
              return self.ignoreRange().containsPoint(entity.x, entity.y);
            });

            const maxDistance = 75;
            const distance = Crafty.math.distance(
              this.x,
              this.y,
              this.currentHive.x,
              this.currentHive.y,
            );

            if (distance >= maxDistance) {
              this.target = this.currentHive;
            }

            if (filteredSmells.length > 0) {
              const sortedResults = filteredSmells.sort((a, b) => {
                return b.strength - a.strength;
              });

              this.target = sortedResults[0];
            }

            if (avoid.length > 2) {
              this.target = this.randomTarget();
            }

            if (food.length > 0) {
              this.target = Crafty.math.randomElementOfArray(food);
            }
          }
        }
      });
    }
  }
});
