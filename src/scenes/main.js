Crafty.scene('main', () => {
  Crafty.background('#eee');
  const team = Crafty.e('Team');
  const swarm = Crafty.e('Ant, TeamAssignment')
    .at(5,4)
    .assign(team)
    .color(team.color);
});
