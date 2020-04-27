import Game from '../game';
import probability from '../utility';

Crafty.s('Attacking', {
  events: {
    UpdateFrame() {
      Crafty('Attacking').each(function(index) {
        const AttackRange = new Crafty.circle(this.x, this.y, 48);

        const results = [];
        Crafty.map.search(this.perceptionSpace(), results);

        const ants = results.filter((entity) => entity.has('Ant'));
        const enemies = ants.filter((entity) => !(entity.isTeam(this.teamId)));
        const targets = enemies.filter((entity) => AttackRange.containsPoint(entity.x, entity.y));

        if (targets.length > 0) {
          this.moveTo(targets[0]);
        }

        if (enemies.length < 1) {
          if (this.hasFood()) {
            this.state.deposit();
          } else {
            this.state.gather();
          }
        }
      });
    },
  },
});

