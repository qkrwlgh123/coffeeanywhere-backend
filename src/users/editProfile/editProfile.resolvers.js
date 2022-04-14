import { protectedResolver } from '../users.utils';
import bcrypt from 'bcrypt';
import client from '../../client';
import fs from 'fs';
import { uploadPhoto } from '../../../shared/shared.utils';

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
          avatarUrl = await uploadToS3(avatar, loggedInUser.id);
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
