import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    addCategory: protectedResolver(
      async (_, { id, name }, { loggedInUser }) => {
        // 전달받아온 id로 커피숍 검색
        const shop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
          },
        });
        if (!shop) {
          return {
            ok: false,
            error: 'That shop does not exist.',
          };
        }
        // 커피숍의 categories에 들어온 name을 추가
        const updated = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            categories: {
              create: {
                name: `#${name}`,
              },
            },
          },
        });
        if (!updated.id) {
          return {
            ok: false,
            error: 'Cant update shop',
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
