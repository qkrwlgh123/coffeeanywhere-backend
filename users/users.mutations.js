import { buildSchemaFromTypeDefinitions } from 'apollo-server';
import client from '../client';
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
          throw new Error('This username/password is already taken.');
        }
        // hash the password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return the user
        return client.user.create({
          data: {
            name,
            username,
            email,
            githubUsername,
            location,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
