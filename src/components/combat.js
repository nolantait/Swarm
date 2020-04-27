import { probability } from '../utility';

Crafty.c('Combat', {
  events: {
    UpdateFrame() {
      Crafty('Ant').each(function(index) {
        if (probability(0.05)) {
          const self = this;
          const results = [];
          Crafty.map.search(this.perceptionSpace(), results);
          const ants = results.filter((entity) => entity.has('Ant'));
          const enemies = ants.filter((entity) => !(entity.isTeam(self.teamId)));

          if (enemies.length > 0) {
            if (self.state.can('attack')) {
              self.target = enemies[0];
              if (self.state.can('attack')) {
                self.state.attack();
              }
            }
          }
        }
      });
    },
  },
});
