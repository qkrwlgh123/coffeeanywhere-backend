import { protectedResolver } from '../users.utils';
import bcrypt from 'bcrypt';
import client from '../../client';
import fs from 'fs';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          name,
          username,
          email,
          password: newPassword,
          location,
          githubUsername,
          avatar,
        },
        { loggedInUser }
      ) => {
        // change the avatar
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            process.cwd() + '/uploads/' + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `localhost:4000/static/${newFilename}`;
        }
        // change the password
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            name,
            username,
            email,
            githubUsername,
            location,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: 'Could not update profile.',
          };
        }
      }
    ),
  },
};
