Crafty.scene('main', () => {
  Crafty.background('#eee');
  const team = Crafty.e('Team');
  Crafty.e('Ant, TeamAssignment')
    .attr({ w: 10, h: 10 })
    .at(20, 20)
    .assign(team)
    .color(team.color);
  Crafty.e('Hive, TeamAssignment')
    .at(20, 20)
    .assign(team)
    .color(team.color);
});
