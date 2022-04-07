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
};
