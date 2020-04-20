import CreateBorders from '../borders';
import { InitializeOccupiedTiles } from '../tile_manager';
import { InitializeSwarm } from '../swarm_manager';

Crafty.scene('main', () => {
  Crafty.background('#eee');
  CreateBorders();
  InitializeOccupiedTiles();
  InitializeSwarm();
});
