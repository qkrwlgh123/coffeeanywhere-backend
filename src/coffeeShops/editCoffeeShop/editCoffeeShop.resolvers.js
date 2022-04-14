import { uploadToS3 } from '../../../shared/shared.utils';
import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { parseCategories } from '../coffeeShops.utils';

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, file, caption },
        { loggedInUser }
      ) => {
        let categoryObj = [];
        let fileUrl;
        if (file) {
          fileUrl = await uploadToS3(file, loggedInUser.id);
        }
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
        if (caption) {
          categoryObj = parseCategories(caption);
        }
        // update information in CoffeeShop
        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            ...(file && {
              photos: {
                create: {
                  url: fileUrl,
                },
              },
            }),
            categories: {
              disconnect: exist.categories,
              connectOrCreate: categoryObj,
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
