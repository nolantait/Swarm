Crafty.scene('main', () => {
  Crafty.background('#eee');
  const team = Crafty.e('Team');
  Crafty.e('Ant, TeamAssignment')
    .attr({ w: 5, h: 5 })
    .at(20, 20)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment')
    .attr({ w: 5, h: 5 })
    .at(20, 20)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment')
    .attr({ w: 5, h: 5 })
    .at(20, 20)
    .assign(team)
    .color(team.color);

  Crafty.e('Food')
    .at(17, 17)
    .color('red');

  Crafty.e('Hive, TeamAssignment')
    .at(20, 20)
    .assign(team)
    .color(team.color);
});
