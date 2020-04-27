import Game from '../game';
import probability from '../utility';

Crafty.s('Depositing', {
  events: {
    UpdateFrame() {
      Crafty('Depositing').each(function(index) {
        this.target = this.randomTarget();

        if (probability(0.75)) {
          const self = this;
          const results = [];
          Crafty.map.search(this.perceptionSpace(), results);

          if (results.length > 0) {
            const hives = results.filter((entity) => entity.has('Hive'));

            const smells = results.filter((entity) => entity.has('HiveSmell'));
            const relevantSmells = smells.filter((entity) => {
              return !(self.ignoreRange().containsPoint(entity.x, entity.y));
            });

            if (relevantSmells.length > 0) {
              const sortedResults = relevantSmells.sort((a, b) => {
                return b.strength - a.strength;
              });

              this.target = sortedResults[0];
            }

            const teamHives = hives.filter((entity) => entity.isTeam(self.teamId))

            if (teamHives.length > 0) {
              this.target = teamHives[0];
            }
          }
        }

        if (probability(0.05)) {
          this.target = this.currentHive;
        }
      });
    }
  }
});
