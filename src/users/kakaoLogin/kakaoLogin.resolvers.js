import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    kakaoLogin: async (_, { username, avatar, email }) => {
      // DB에 해당 유저의 정보가 존재하는지 찾는다.
      const findUser = await client.user.findUnique({
        where: {
          username: `${username}(kakao)`,
        },
      });
      // 만약 존재하지 않으면 DB에 이름, 닉네임, 아바타, 이메일을 저장 한 후에 토큰 발행해준다.
      if (!findUser) {
        const uglyPassword = await bcrypt.hash(username, 10);
        const createUser = await client.user.create({
          data: {
            name: username,
            username: `${username}(kakao)`,
            email: `${email}(kakao)`,
            avatar,
            password: uglyPassword,
            isKaKao: true,
          },
        });
        const token = await jwt.sign(
          { id: createUser.id },
          process.env.SECRET_KEY
        );
        return {
          ok: true,
          token,
          name: user.username,
        };
      }
      const token = await jwt.sign({ id: findUser.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
