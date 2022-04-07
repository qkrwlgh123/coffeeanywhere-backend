import client from '../../client';

export default {
  Query: {
    seeCoffeeShop: async (_, { id }) => {
      const shop = await client.coffeeShop.findUnique({
        where: {
          id,
        },
      });
      if (!shop) {
        return {
          ok: false,
          error: 'Coffee shop was not found',
        };
      }
      return {
        ok: true,
        shop,
      };
    },
  },
};
