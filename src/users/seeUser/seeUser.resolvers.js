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
      // Count total Followers
      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });
      // Search following
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: (page - 1) * 5,
        });
      // Count total Following
      const totalFollowing = await client.user.count({
        where: {
          followers: {
            some: { username },
          },
        },
      });
      return {
        ok: true,
        followers,
        totalFollowers,
        following,
        totalFollowing,
      };
    },
  },
};
