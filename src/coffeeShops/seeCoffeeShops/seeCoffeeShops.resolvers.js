import client from '../../client';

export default {
  Query: {
    seeCoffeeShops: (_, { page, keyword }) =>
      client.coffeeShop.findMany({
        take: 4,
        skip: page,
        where: {
          open: {
            equals: true,
          },
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              AND: {
                categories: {
                  some: {
                    name: {
                      contains: `${keyword}`,
                    },
                  },
                },
              },
            },
          ],
        },
      }),
  },
};
