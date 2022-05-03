import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    deleteCategory: async (_, { id }, { loggedInUser }) => {
      if (!id) {
        return {
          ok: false,
          error: 'That id is not exist.',
        };
      }
      await client.category.delete({
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
