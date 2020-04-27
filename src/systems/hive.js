import Game from '../game';
import probability from '../utility';

Crafty.s('Hive', {
  events: {
    UpdateFrame() {
      Crafty('Hive').each(function(index) {
        const self = this;
        const area = this.pos();
        const results = [];
        Crafty.map.search(area, results);

        const ants = results.filter((entity) => entity.has('Ant'));
        const friendlyAnts = ants.filter((entity) => entity.isTeam(self.teamId));
        const withFood = friendlyAnts.filter((entity) => entity.hasFood());

        for (let i = 0; i < withFood.length; i += 1) {
          const ant = withFood[i];
          ant.food -= 1;
          ant.state.gather();
          ant.currentHive = self;
          self.food += 1;
        }
      });
    },
  },
});
