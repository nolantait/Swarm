import Game from '../game';
import { orientTo, probability } from '../utility';

Crafty.s('Gathering', {
  events: {
    UpdateFrame() {
      Crafty('Gathering').each(function(index) {
        const results = [];
        Crafty.map.search(this.perceptionSpace(), results);
        const filteredGoalResults = results.filter((entity) => entity.has('Food'));

        const IgnoreRange = new Crafty.circle(this.x, this.y, 35);
        const filteredSmellResults = results.filter((entity) => {
          const excluded = IgnoreRange.containsPoint(entity.x, entity.y);
          if (entity.has('FoodSmell') && !excluded) {
            return true;
          }
          return false;
        });


        if (filteredGoalResults.length > 0) {
          orientTo(this, filteredGoalResults[0], this._speed);
        } else if (filteredSmellResults.length > 0) {
          const sortedResults = filteredSmellResults.sort((a, b) => {
            return b.strength - a.strength;
          });
          orientTo(this, sortedResults[0], this._speed);
        } else {
          const xdiff = Crafty.math.negate(0.5) * Game.tile.width;
          const ydiff = Crafty.math.negate(0.5) * Game.tile.height;
          const posDiff = {
            x: this.x + xdiff,
            y: this.y + ydiff,
          };
          orientTo(this, posDiff, this._speed);
        }
      });
    }
  }
});
