import client from '../../client';

export default {
  Query: {
    seeMyShopList: async (_, {}, { loggedInUser }) => {
      // loggedInUser를 client에서 찾는다.
      const list = await client.user
        .findUnique({
          where: {
            id: loggedInUser.id,
          },
        })
        .coffeeShop();
      if (list) {
        return list;
      }
      // 해당 유저가 가진 커피숍 목록을 반환한다.
    },
  },
};
