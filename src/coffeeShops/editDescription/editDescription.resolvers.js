import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    editDescription: async (_, { id, description }) => {
      await client.coffeeShop.update({
        where: {
          id,
        },
        data: {
          description,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
