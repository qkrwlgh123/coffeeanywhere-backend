import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    createShop(
      name: String!
      caption: String
      latitude: String
      longitude: String
      file: String
    ): CoffeeShop
  }
`;
