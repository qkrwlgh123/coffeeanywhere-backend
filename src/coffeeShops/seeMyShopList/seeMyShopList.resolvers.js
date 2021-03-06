import client from '../../client';

export default {
  Query: {
    seeMyShopList: (_, {}, { loggedInUser }) =>
      client.coffeeShop.findMany({
        where: {
          userId: loggedInUser.id,
        },
      }),
  },
};
