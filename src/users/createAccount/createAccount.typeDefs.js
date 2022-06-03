import { gql } from 'apollo-server';

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      name: String!
      username: String!
      description: String
      email: String!
      avatar: Upload
      password: String!
    ): createAccountResult!
  }
`;
