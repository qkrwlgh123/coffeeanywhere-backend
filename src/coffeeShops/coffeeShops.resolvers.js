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
  },
};
