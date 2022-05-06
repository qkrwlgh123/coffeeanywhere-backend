import client from '../../client';
import { deleteFromS3 } from '../../shared/shared.utils';

export default {
  Mutation: {
    deletePhoto: async (_, { id }) => {
      if (!id) {
        return {
          ok: false,
          error: 'That id is not exist.',
        };
      }
      const { url } = await client.coffeeShopPhoto.findUnique({
        where: { id },
      });
      await deleteFromS3(url);
      await client.coffeeShopPhoto.delete({
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
