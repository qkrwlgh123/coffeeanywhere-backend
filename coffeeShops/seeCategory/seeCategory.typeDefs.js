import { gql } from 'apollo-server-express';

export default gql`
  type SeeCategoryResult {
    ok: Boolean!
    error: String
    list: [CoffeeShop]
  }
  type Query {
    seeCategory(category: String!, page: Int): SeeCategoryResult!
  }
`;
