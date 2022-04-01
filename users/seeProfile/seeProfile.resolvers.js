import client from '../../client';

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      const findedUser = await client.user.findUnique({
        where: { username },
      });
      if (!findedUser) {
        throw new Error('This user is not exist.');
      }
      return findedUser;
    },
  },
};
