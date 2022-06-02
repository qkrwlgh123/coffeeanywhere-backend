import client from '../../client';

export default {
  Query: {
    seeMyProfile: async (_, { username }, { loggedInUser }) => {
      // User checking
      const exist = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });
      if (!exist) {
        return {
          ok: false,
          error: 'Please Log in.',
        };
      }
      // search User's shops
      const shopList = await client.user
        .findUnique({
          where: {
            id: loggedInUser.id,
          },
        })
        .coffeeShop();
      // search User's likes
      const likes = await client.user
        .findUnique({
          where: {
            id: loggedInUser.id,
          },
        })
        .likes();
      // Search followers
      const followers = await client.user
        .findUnique({ where: { id: loggedInUser.id } })
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
        .findUnique({ where: { id: loggedInUser.id } })
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
        likes,
        shop: shopList,
        totalFollowers,
        following,
        totalFollowing,
      };
    },
  },
};
