import client from '../../client';

export default {
  Mutation: {
    editReply: async (_, { id, content }) => {
      // id : 가게 id 에 들어온 content를 삽입
      const reply = await client.reply.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
