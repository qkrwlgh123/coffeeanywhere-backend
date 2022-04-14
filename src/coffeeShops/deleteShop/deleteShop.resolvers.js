import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    deleteShop: async (_, { id }, { loggedInUser }) => {
      await client.coffeeShopPhoto.deleteMany({
        where: {
          coffeeShopId: id,
        },
      });
      await client.coffeeShop.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
