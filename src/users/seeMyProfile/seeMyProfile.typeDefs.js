import { gql } from 'apollo-server-express';

export default gql`
  type SeeUserResult {
    ok: Boolean!
    error: String
    user: User
    likes: [Like]
    shop: [CoffeeShop]
    followers: [User]
    following: [User]
    totalFollowers: Int
    totalFollowing: Int
  }
  type Query {
    seeMyProfile(username: String): SeeUserResult!
  }
`;
