import client from '../../client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createAccount: async (
      _,
      { name, username, email, location, githubUsername, password }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: 'This username or email is already exist.',
          };
        } else {
          const uglyPassword = await bcrypt.hash(password, 10);
          // save and return the user
          const createdUser = await client.user.create({
            data: {
              name,
              username,
              email,
              githubUsername,
              location,
              password: uglyPassword,
            },
          });
          if (createdUser.name) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              error: 'Could not create a user.',
            };
          }
        }
      } catch (e) {
        return e;
      }
    },
  },
};
