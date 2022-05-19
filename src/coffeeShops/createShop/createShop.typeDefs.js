import { gql } from 'apollo-server';

export default gql`
  type createShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createShop(
      name: String!
      caption: String
      latitude: String
      longitude: String
      description: String
      open: Boolean
      file: [Upload]
    ): createShopResult
  }
`;
