import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type BoardState {
    base64: String
    births: Int
    deaths: Int
    total: Int
  }

  type Query {
    board: BoardState
  }

  type Mutation {
    putPattern (positions: [Int]): Boolean
  }

  type Subscription {
    boardUpdated: BoardState
  }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
