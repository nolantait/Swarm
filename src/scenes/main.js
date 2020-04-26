import Game from '../game';

Crafty.scene('main', () => {
  Crafty.background('#eee');
  Crafty.s('Depositing');
  Crafty.s('Gathering');
  Crafty.s('Smell');

  const centerX = Game.map.width / 2;
  const centerY = Game.map.height / 2;

  const team = Crafty.e('Team');
  Crafty.e('Hive, TeamAssignment')
    .attr({ w: 10, h: 10 })
    .at(centerX, centerY)
    .assign(team)
    .color(team.color);

  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(centerX, centerY)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(centerX, centerY)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(centerX, centerY)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(centerX, centerY)
    .assign(team)
    .color(team.color);
  Crafty.e('Ant, TeamAssignment, Gathering')
    .attr({ w: 5, h: 5 })
    .at(centerX, centerY)
    .assign(team)
    .color(team.color);


  for (let i = 0; i < 25; i += 1) {
    Crafty.e('Food')
      .at(Crafty.math.randomInt(10, Game.map.width), Crafty.math.randomInt(10, Game.map.height))
      .with(Crafty.math.randomInt(10, 40))
      .color('red');
  }
});
