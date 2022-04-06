import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    name: String!
    username: String!
    email: String!
    location: String!
    githubUsername: String!
    avatar: String
    following: [User]
    followers: [User]
    CoffeeShop: [CoffeeShop]
    createdAt: String!
    updatedAt: String!
  }
`;
