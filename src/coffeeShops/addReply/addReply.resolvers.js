import client from '../../client';

export default {
  Mutation: {
    addReply: async (_, { id, content }, { loggedInUser }) => {
      // id : 가게 id 에 들어온 content를 삽입
      const reply = await client.reply.create({
        data: {
          userId: loggedInUser.id,
          coffeeShopId: id,
          content,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
