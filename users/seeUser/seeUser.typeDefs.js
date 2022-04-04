import { gql } from 'apollo-server-express';

export default gql`
  type SeeUserResult {
    ok: Boolean!
    error: String
    followers: [User]
    following: [User]
  }
  type Query {
    seeUser(username: String!, page: Int!): SeeUserResult!
  }
`;
