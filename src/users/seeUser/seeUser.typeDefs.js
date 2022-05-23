import { gql } from 'apollo-server-express';

export default gql`
  type SeeUserResult {
    ok: Boolean!
    error: String
    user: User
    shop: [CoffeeShop]
    followers: [User]
    following: [User]
    totalFollowers: Int
    totalFollowing: Int
  }
  type Query {
    seeUser(username: String): SeeUserResult!
  }
`;
