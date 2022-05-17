import client from '../../client';

export default {
  Mutation: {
    deleteLike: async (_, { id }, { loggedInUser }) => {
      const deleteLike = await client.like.deleteMany({
        where: {
          coffeeShopId: id,
          userId: loggedInUser.id,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
