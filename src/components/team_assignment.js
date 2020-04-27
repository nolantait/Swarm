Crafty.c('TeamAssignment', {
  isTeam(teamId) {
    return (this.teamId === teamId);
  },

  assign(team) {
    this.teamId = team.getId();
    return this;
  },
});
