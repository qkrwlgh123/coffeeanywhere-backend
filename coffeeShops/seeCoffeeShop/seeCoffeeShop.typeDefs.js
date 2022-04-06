import { gql } from 'apollo-server-express';

export default gql`
  type CoffeeShopResult {
    ok: Boolean!
    error: String
    shop: CoffeeShop
  }
  type Query {
    seeCoffeeShop(id: Int!): CoffeeShopResult!
  }
`;
