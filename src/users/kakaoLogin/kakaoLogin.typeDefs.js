import { gql } from 'apollo-server';

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
    name: String
  }
  type Mutation {
    kakaoLogin(username: String, avatar: String, email: String): LoginResult!
  }
`;
