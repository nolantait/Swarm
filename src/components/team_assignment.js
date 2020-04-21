Crafty.c('TeamAssignment', {
  required: 'Color',

  init() {
  },

  assign(team) {
    this.teamId = team.getId();
    return this;
  },
});
