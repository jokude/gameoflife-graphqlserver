import Game from './game';
import GamePubSub from './gamePubSub';

const game = new Game();
const pubsub = new GamePubSub(game);
pubsub.start();

export default {
  Query: {
    board: () => game.getBoard()
  },
  Mutation: {
    putPattern: (_, { positions }) => pubsub.putPattern(positions)
  },
  Subscription: {
    boardUpdated: {
      subscribe: () => pubsub.getIterator()
    }
  }
};
