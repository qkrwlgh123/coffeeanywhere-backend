import { gql } from 'apollo-server';

export default gql`
  type DeleteShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteShop(id: Int!): DeleteShopResult
  }
`;
