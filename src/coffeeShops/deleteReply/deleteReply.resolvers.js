import client from '../../client';

export default {
  Mutation: {
    deleteReply: async (_, { id }) => {
      const reply = await client.reply.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
