import { protectedResolver } from '../users.utils';
import bcrypt from 'bcrypt';
import client from '../../client';

import { deleteFromS3, uploadToS3 } from '../../shared/shared.utils';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, description, password: newPassword, avatar },
        { loggedInUser }
      ) => {
        // check if username or email is exist
        const exist = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                AND: {
                  email,
                },
              },
            ],
          },
        });
        if (exist) {
          return {
            ok: false,
            error: '이미 존재하는 사용자 이름 또는 이메일입니다.',
          };
        }
        // change the avatar
        let avatarUrl = null;
        if (avatar) {
          const user = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
          });
          if (user.avatar) {
            await deleteFromS3(user.avatar);
          }
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
            username,
            email,
            description,
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
            error: '회원 정보를 수정하는데 실패했습니다.',
          };
        }
      }
    ),
  },
};
