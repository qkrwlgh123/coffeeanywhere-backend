import client from '../../client';

export default {
  Query: {
    seeProfile: (_, { username, page }, { loggedInUser }) =>
      client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      }),
  },
};
