import client from '../../client';

export default {
  Query: {
    seeUser: async (_, { username }) => {
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
      // search User's shops
      const shopList = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .coffeeShop();
      // Search followers
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({});
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
        .following({});
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
        user: exist,
        shop: shopList,
        totalFollowers,
        following,
        totalFollowing,
      };
    },
  },
};
