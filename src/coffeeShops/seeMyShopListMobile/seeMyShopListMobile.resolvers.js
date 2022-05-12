import client from '../../client';

export default {
  Query: {
    seeMyShopListMobile: (_, { offset }, { loggedInUser }) =>
      client.coffeeShop.findMany({
        take: 4,
        skip: offset,
        where: {
          userId: loggedInUser.id,
        },
      }),
  },
};
