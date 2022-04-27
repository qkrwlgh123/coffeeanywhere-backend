import { gql } from 'apollo-server';

export default gql`
  type Query {
    seeMyShopListMobile(offset: Int): [CoffeeShop]
  }
`;
