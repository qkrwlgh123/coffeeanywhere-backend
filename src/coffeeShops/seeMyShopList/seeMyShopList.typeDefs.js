import { gql } from 'apollo-server';

export default gql`
  type Query {
    seeMyShopList: [CoffeeShop]
  }
`;
