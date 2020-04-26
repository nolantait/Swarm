import Game from '../game';

Crafty.scene('main', () => {
  Crafty.background('#eee');
  Crafty.s('Depositing');
  Crafty.s('Gathering');
  Crafty.s('Smell');

  const teamA = Crafty.e('Team');
  const teamB = Crafty.e('Team');
  const teamAHive = Crafty.e('Hive, TeamAssignment')
    .attr({ w: 10, h: 10 })
    .at(30, 30)
    .assign(teamA)
    .color(teamA.color);
  const teamBHive = Crafty.e('Hive, TeamAssignment')
    .attr({ w: 10, h: 10 })
    .at(20, 20)
    .assign(teamB)
    .color(teamB.color);


  for (let i = 0; i < 5; i += 1) {
    Crafty.e('Ant, TeamAssignment, Gathering')
      .checkHits('Ant')
      .attr({
        w: 5,
        h: 5,
        currentHive: teamAHive,
        x: teamAHive.x,
        y: teamAHive.y,
      })
      .assign(teamA)
      .color(teamA.color);
    Crafty.e('Ant, TeamAssignment, Gathering')
      .checkHits('Ant')
      .attr({
        w: 5,
        h: 5,
        currentHive: teamBHive,
        x: teamBHive.x,
        y: teamBHive.y,
      })
      .assign(teamB)
      .color(teamB.color);
  }

  for (let i = 0; i < 50; i += 1) {
    Crafty.e('Food')
      .at(Crafty.math.randomInt(10, Game.map.width), Crafty.math.randomInt(10, Game.map.height))
      .with(Crafty.math.randomInt(10, 30))
      .color('red');
  }
});
