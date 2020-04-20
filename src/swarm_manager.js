import { PlaceEntity } from './tile_manager';
import { randomInt } from './utility';

function makeSwarm(team) {
  return Crafty.e('Swarm').attr({ team: team });
}

export function InitializeSwarms(numberOfTeams) {
  for (let i = 0; i < numberOfTeams; i += 1) {
    PlaceEntity(makeSwarm(i), 1, 1);
  }
}

export default InitializeSwarms();
