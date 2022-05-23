import {
  deleteAllFromS3,
  uploadAllToS3,
  uploadToS3,
} from '../../shared/shared.utils';
import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { parseCategories } from '../coffeeShops.utils';

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (_, { id, caption, description, open, file }, { loggedInUser }) => {
        let fileUrl;
        // inspect CoffeeShop with id [ o ]
        const exist = await client.coffeeShop.findUnique({
          where: { id },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
            photos: {
              select: {
                url: true,
              },
            },
          },
        });
        if (!exist) {
          return {
            ok: false,
            error: 'That shop does not exist.',
          };
        }
        // if caption is exist, Parse category from caption
        let categoryObj = [];
        if (caption) {
          categoryObj = parseCategories(caption);
        }

        // update information in CoffeeShop

        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            description,
            open,
            // ...(file.length === 0 && {
            //   photos: {
            //     deleteMany: exist.photos,
            //   },
            // }),
            // ...(fileUrl.length > 0 && {
            //   photos: {
            //     deleteMany: exist.photos,
            //     create: fileUrl,
            //   },
            // }),
            ...(categoryObj.length === 0 && {
              categories: {
                deleteMany: exist.categories,
              },
            }),
            ...(categoryObj.length > 0 && {
              categories: {
                deleteMany: exist.categories,
                create: categoryObj,
              },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
