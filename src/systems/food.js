Crafty.s('Food', {
  events: {
    UpdateFrame() {
      Crafty('Food').each(function(index) {
        const self = this;
        const area = this.pos();
        const results = [];
        Crafty.map.search(area, results);

        const ants = results.filter((entity) => entity.has('Ant'));
        const withoutFood = ants.filter((entity) => !(entity.hasFood()));

        for (let i = 0; i < withoutFood.length; i += 1) {
          const ant = withoutFood[i];
          ant.food += 1;
          ant.state.deposit();
          ant.currentFood = self;
          self.food = self.food - 1;
        }
      });
    },
  },
});
