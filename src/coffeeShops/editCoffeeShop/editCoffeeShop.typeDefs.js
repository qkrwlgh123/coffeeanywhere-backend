import { gql } from 'apollo-server';

export default gql`
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      caption: String
      description: String
      open: Boolean
      file: [Upload]
      deleteFromS3: [String]
    ): EditCoffeeShopResult
  }
`;
