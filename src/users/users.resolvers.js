import client from '../client';

export default {
  User: {
    likes: async ({ id }) => {
      const like = await client.user
        .findUnique({
          where: {
            id,
          },
        })
        .likes();
      return like;
    },
  },
};
