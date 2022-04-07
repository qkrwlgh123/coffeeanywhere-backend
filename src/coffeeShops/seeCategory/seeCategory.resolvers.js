import client from '../../client';

export default {
  Query: {
    seeCategory: async (_, { category, page }) => {
      const hashtagName = `#${category}`;
      const exist = await client.category.findUnique({
        where: {
          name: hashtagName,
        },
      });
      if (!exist) {
        return { ok: false, error: 'That category does not exist.' };
      }
      const result = await client.category
        .findUnique({
          where: {
            name: hashtagName,
          },
        })
        .shops({
          take: 5,
          skip: (page - 1) * 5,
        });
      return {
        ok: true,
        list: result,
      };
    },
  },
};
