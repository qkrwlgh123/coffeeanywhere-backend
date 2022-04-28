import client from '../../client';

export default {
  Query: {
    searchShops: (_, { keyword }) =>
      client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              name: {
                startsWith: `#${keyword}`,
              },
            },
          },
        },
      }),
  },
};
