import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    name: String!
    username: String!
    email: String!
    avatar: String
    description: String
    following: [User]
    followers: [User]
    CoffeeShop: [CoffeeShop]
    reply: [Reply]
    likes: [Like]
    createdAt: String!
    updatedAt: String!
  }
`;
