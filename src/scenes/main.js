Crafty.scene('main', () => {
  Crafty.background('#eee');
  Crafty.s('Depositing');
  Crafty.s('Gathering');
  Crafty.s('Smell');

  const team = Crafty.e('Team');
  Crafty.e('Hive, TeamAssignment')
    .attr({ w: 10, h: 10 })
    .at(20, 20)
    .assign(team)
    .color(team.color);

  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(20, 20)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(20, 20)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(20, 20)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(20, 20)
    .assign(team)
    .color(team.color);


  Crafty.e('Food')
    .at(25, 17)
    .with(50)
    .color('red');

  Crafty.e('Food')
    .at(30, 23)
    .with(50)
    .color('red');


  Crafty.e('Food')
    .at(20, 25)
    .with(25)
    .color('red');
});
