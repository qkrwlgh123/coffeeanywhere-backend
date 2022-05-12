import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    editOpen: async (_, { id, open }) => {
      await client.coffeeShop.update({
        where: {
          id,
        },
        data: {
          open,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
