import express from 'express';
import { createServer } from 'http';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import schema from './schema';

const PORT = process.env.PORT || 3000;
const server = express();

server.use('*', cors({ origin: '*' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  graphiql: true
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://192.168.0.7:${PORT}/subscriptions`
}));

const ws = createServer(server);

ws.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Apollo Server is now running on http://localhost:${PORT}`);

  SubscriptionServer.create({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions'
  });
});
