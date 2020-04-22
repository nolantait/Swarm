Crafty.scene('main', () => {
  Crafty.background('#eee');
  Crafty.s('Pathfinding');

  const team = Crafty.e('Team');
  Crafty.e('Hive, TeamAssignment')
    .attr({ w: 10, h: 10 })
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

  Crafty.e('Food')
    .at(23, 23)
    .color('red');


  Crafty.e('Food')
    .at(20, 25)
    .color('red');
});
