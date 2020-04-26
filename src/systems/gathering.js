import Game from '../game';
import probability from '../utility';

Crafty.s('Gathering', {
  events: {
    UpdateFrame() {
      Crafty('Gathering').each(function(index) {
        if (probability(0.25)) {
          const results = [];
          Crafty.map.search(this.perceptionSpace(), results);
          const filteredGoalResults = results.filter((entity) => entity.has('Food'));

          const IgnoreRange = new Crafty.circle(this.x, this.y, 32);
          const AvoidRange = new Crafty.circle(this.x, this.y, 64);

          const otherAnts = results.filter((entity) => {
            const included = AvoidRange.containsPoint(entity.x, entity.y);
            if (entity.has('Ant') && included) {
              return true;
            }
            return false;
          });

          const filteredSmellResults = results.filter((entity) => {
            const excluded = IgnoreRange.containsPoint(entity.x, entity.y);
            if (entity.has('FoodSmell') && !excluded) {
              return true;
            }
            return false;
          });

          const xdiff = Crafty.math.negate(0.5) * (Game.tile.width * 2);
          const ydiff = Crafty.math.negate(0.5) * (Game.tile.height * 2);
          let target = {
            x: this.x + xdiff,
            y: this.y + ydiff,
          };

          if (filteredSmellResults.length > 0) {
            const sortedResults = filteredSmellResults.sort((a, b) => {
              return b.strength - a.strength;
            });

            target = sortedResults[0];
          }

          if (otherAnts.length > 3) {
            target = {
              x: this.x + xdiff,
              y: this.y + ydiff,
            };
          }

          if (filteredGoalResults.length > 0) {
            target = filteredGoalResults[0];
          }

          this.moveTo(target);
        }
      });
    }
  }
});
