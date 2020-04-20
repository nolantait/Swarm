const Game = {
  map: {
    width: 100,
    height: 50,
  },
  tile: {
    width: 16,
    height: 16,
  },

  width() { return this.map.width * this.tile.width; },
  height() { return this.map.height * this.tile.height; },
};

export default Game;
