import { gql } from 'apollo-server';

export default gql`
  type CoffeeShop {
    id: Int!
    name: String
    latitude: String
    longitude: String
    description: String
    open: Boolean
    address: String
    user: User
    isMe: Boolean
    photos: [CoffeeShopPhoto]
    categories: [Category]
    replys: [Reply]
    likes: [Like]
    isLike: Boolean
    createdAt: String
    updatedAt: String
  }
  type CoffeeShopPhoto {
    id: Int
    url: String
    shop: CoffeeShop
  }
  type Category {
    id: Int!
    name: String
    slug: String
    shops: [CoffeeShop]
    totalShops: Int
  }
  type Reply {
    id: Int!
    content: String
    user: User
    isMe: Boolean
    coffeeShop: CoffeeShop
    createdAt: String
    updatedAt: String
  }
  type Like {
    id: Int!
    like: Boolean
    user: User
    coffeeShop: CoffeeShop
  }
`;
