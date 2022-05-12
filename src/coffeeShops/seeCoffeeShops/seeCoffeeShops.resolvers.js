import client from '../../client';

export default {
  Query: {
    seeCoffeeShops: (_, { offset }) =>
      // 다 작성하면 중괄호 제거
      client.coffeeShop.findMany({
        take: 4,
        skip: offset,
        where: {
          open: {
            equals: true,
          },
        },
      }),
  },
};
