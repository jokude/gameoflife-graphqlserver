import { PubSub } from 'graphql-subscriptions';

const CYCLE_DELAY = 1000;

class GamePubSub {
  constructor(game) {
    this.pubsub = new PubSub();
    this.game = game;
  }

  cycle() {
    const generationData = this.game.cycle();
    this.pubsub.publish('boardUpdated', {
      boardUpdated: generationData
    });
  }

  putPattern(positions) {
    this.game.putPattern(positions);
  }

  start() {
    setInterval(this.cycle.bind(this), CYCLE_DELAY);
  }

  getIterator() {
    return this.pubsub.asyncIterator('boardUpdated');
  }
}

export default GamePubSub;
