import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    name: String!
    username: String!
    email: String!
    location: String!
    githubUsername: String!
    avatarURL: String
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(
      name: String!
      username: String!
      email: String!
      location: String!
      githubUsername: String!
      password: String!
    ): User
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
