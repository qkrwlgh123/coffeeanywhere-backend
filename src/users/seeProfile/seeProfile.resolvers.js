import client from '../../client';

export default {
  Query: {
    seeProfile: (_, { username, page }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
