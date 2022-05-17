import client from '../../client';

export default {
  Mutation: {
    addLike: async (_, { id, like }, { loggedInUser }) => {
      const addedLike = await client.like.create({
        data: {
          userId: loggedInUser.id,
          coffeeShopId: id,
          like,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
