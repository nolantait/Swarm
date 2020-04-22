import Game from '../game';
import { orientTo } from '../utility';

Crafty.s('Pathfinding', {
  events: {
    UpdateFrame() {
      Crafty('Ant').each(function(index) {
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
          orientTo(this, filteredGoalResults[0], this._speed);
        } else if (filteredSmellResults.length > 0 && this.goal === 'Hive') {
          const sortedResults = filteredSmellResults.sort((a, b) => b.strength - a.strength);
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
