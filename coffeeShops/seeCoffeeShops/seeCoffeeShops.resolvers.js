import client from '../../client';

export default {
  Query: {
    seeCoffeeShops: (_, { page }) =>
      // 다 작성하면 중괄호 제거
      client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};
