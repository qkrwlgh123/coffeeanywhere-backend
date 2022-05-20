import client from '../../client';
import bcrypt from 'bcrypt';
import { uploadToS3 } from '../../shared/shared.utils';

export default {
  Mutation: {
    createAccount: async (
      _,
      { name, username, email, location, avatar, password }
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
          // upload avatarUrl
          let avatarUrl;
          if (avatar) {
            avatarUrl = await uploadToS3(avatar, username);
          }
          // save and return the user
          const createdUser = await client.user.create({
            data: {
              name,
              username,
              email,
              avatar: avatarUrl,
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
