import Game from './game';

export function InitializeOccupiedTiles() {
  this.occupied = new Array(Game.map.width);

  for (let x = 0; x < Game.map.width; x += 1) {
    this.occupied[x] = new Array(Game.map.height);

    for (let y = 0; y < Game.map.width; y += 1) {
      this.occupied[x][y] = false;
    }
  }
}

export function PlaceEntity(entity, x, y) {
  entity.at(x, y);
  this.occupied[x][y] = entity;
}

export default InitializeOccupiedTiles();
