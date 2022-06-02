import client from '../../client';
import { deleteAllFromS3 } from '../../shared/shared.utils';

export default {
  Mutation: {
    deleteShop: async (_, { id }, { loggedInUser }) => {
      const urls = await client.coffeeShop
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
      await deleteAllFromS3(urls);
      await client.coffeeShopPhoto.deleteMany({
        where: {
          coffeeShopId: id,
        },
      });
      await client.like.deleteMany({
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
