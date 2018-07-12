import GameOfLife from 'life-game';

const BOARD_SIZE = 40;

class Game {
  constructor() {
    this.gol = new GameOfLife(BOARD_SIZE, BOARD_SIZE);
    this.births = 0;
    this.deaths = 0;
    this.generation = null;
  }

  getStats(generation){
    return {
      total: generation.filter(state => state).length,
      births: this.births,
      deaths: this.deaths
    };
  }

  setBoard(map) {
    this.gol.setMap(map);
  }

  getBoard(){
    const board = this.gol.map.map(({ state }) => state);
    const binaryMap = GameOfLife.binaryLife(board);
    return Object.assign({
      base64: binaryMap.toString('base64'),
    }, this.getStats(this.gol.map));
  }

  encodeData(data){
    return data.toString('base64');
  }

  cycle() {
    this.generation = this.gol.cycle();
    const newBirths = this.generation.realChanges.filter(({ newState }) => newState).length;
    this.births += newBirths;
    this.deaths += this.generation.realChanges.length - newBirths;
    this.gol.setMap(this.generation.map);
    return {
      boardUpdated: {
        base64: this.generation.mapBinary.toString('base64'),
        total: this.generation.map.filter(state => state).length,
        births: this.births,
        deaths: this.deaths
      }
    };
  }

  putPattern(positions) {
    const map = this.generation.map.slice();
    positions.forEach((index) => {
      map[index] = true;
    });
    this.gol.setMap(map);
  }
}

export default Game;
