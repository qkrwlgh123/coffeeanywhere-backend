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
      email: String!
      location: String!
      githubUsername: String!
      password: String!
    ): createAccountResult!
  }
`;
