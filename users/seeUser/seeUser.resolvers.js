import client from '../../client';

export default {
  Query: {
    seeUser: async (_, { username, page }) => {
      // User checking
      const exist = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!exist) {
        return {
          ok: false,
          error: 'That user does not exist.',
        };
      }
      // Search followers
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      // Search following
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: (page - 1) * 5,
        });

      return {
        ok: true,
        followers,
        following,
      };
    },
  },
};
