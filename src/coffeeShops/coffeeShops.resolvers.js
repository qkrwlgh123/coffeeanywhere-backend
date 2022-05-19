import client from '../client';

export default {
  Category: {
    totalShops: async ({ id }) => {
      const shopList = await client.category
        .findUnique({
          where: {
            id,
          },
        })
        .shops();
      return shopList.length;
    },
  },
  CoffeeShop: {
    photos: async ({ id }) => {
      const photoList = await client.coffeeShop
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
      return photoList;
    },
    categories: async ({ id }) => {
      const categoryList = await client.coffeeShop
        .findUnique({
          where: {
            id,
          },
        })
        .categories();
      return categoryList;
    },
    user: async ({ id }) => {
      const user = await client.coffeeShop
        .findFirst({
          where: {
            id,
          },
        })
        .user();
      return user;
    },
    replys: async ({ id }) => {
      const replys = await client.coffeeShop
        .findUnique({
          where: {
            id,
          },
        })
        .replys();
      return replys;
    },
    likes: async ({ id }) => {
      const likes = await client.coffeeShop
        .findUnique({
          where: {
            id,
          },
        })
        .likes();
      return likes;
    },
    isLike: async ({ id }, {}, { loggedInUser }) => {
      const like = await client.like.findFirst({
        where: {
          coffeeShopId: id,
          userId: loggedInUser?.id,
        },
      });
      if (like) {
        return true;
      } else {
        return false;
      }
    },
  },
  Reply: {
    user: async ({ id }) => {
      // 해당 id(유일함)를 가진 reply를 가진 user 찾기
      const reply = await client.reply
        .findUnique({
          where: {
            id,
          },
        })
        .user();
      return reply;
    },
  },
  Like: {
    user: async ({ id }) => {
      const like = await client.like
        .findUnique({
          where: {
            id,
          },
        })
        .user();
      return like;
    },
  },
};
