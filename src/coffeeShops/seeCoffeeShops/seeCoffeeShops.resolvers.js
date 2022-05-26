import client from '../../client';

export default {
  Query: {
    seeCoffeeShops: (_, { offset, keyword }) =>
      client.coffeeShop.findMany({
        take: 12,
        skip: offset,
        where: {
          open: {
            equals: true,
          },
          name: {
            contains: keyword,
          },
          categories: {
            some: {
              name: {
                contains: keyword,
              },
            },
          },
        },
      }),
  },
};
