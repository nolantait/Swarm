import Game from '../game';
import probability from '../utility';

Crafty.s('Gathering', {
  events: {
    UpdateFrame() {
      Crafty('Gathering').each(function(index) {
        if (probability(0.25)) {
          const results = [];
          Crafty.map.search(this.perceptionSpace(), results);
          if (results.length > 0) {
            const filteredGoalResults = results.filter((entity) => entity.has('Food'));

            const IgnoreRange = new Crafty.circle(this.x, this.y, 32);
            const AvoidRange = new Crafty.circle(this.x, this.y, 64);

            const self = this;
            const sameTeam = results.filter((entity) => {
              if (entity.teamId === self.teamId) {
                return true;
              }
              return false;
            });

            const otherTeam = results.filter((entity) => {
              if (entity.teamId !== self.teamId) {
                return true;
              }
              return false;
            });

            const otherAnts = sameTeam.filter((entity) => {
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

            const maxDistance = 75;
            const distance = Crafty.math.distance(
              this.x,
              this.y,
              this.currentHive.x,
              this.currentHive.y,
            );

            if (distance >= maxDistance) {
              target = this.currentHive;
            }

            if (filteredSmellResults.length > 0) {
              const sortedResults = filteredSmellResults.sort((a, b) => {
                return b.strength - a.strength;
              });

              target = sortedResults[0];
            }

            if (otherAnts.length > 2) {
              target = {
                x: this.x + xdiff,
                y: this.y + ydiff,
              };
            }

            if (filteredGoalResults.length > 0) {
              target = Crafty.math.randomElementOfArray(filteredGoalResults);
            }

            if (otherTeam.length > 0) {
              target = Crafty.math.randomElementOfArray(otherTeam);
            }

            this.moveTo(target);
          }
        }
      });
    }
  }
});
