import { uploadAllToS3, uploadToS3 } from '../../shared/shared.utils';
import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { parseCategories } from '../coffeeShops.utils';

export default {
  Mutation: {
    createShop: protectedResolver(
      async (
        _,
        { name, caption, latitude, longitude, description, open, file },
        { loggedInUser }
      ) => {
        // upload a photo
        let fileUrl;
        if (file) {
          fileUrl = await uploadAllToS3(file, loggedInUser.id);
        }
        // parse categories from caption(ok)
        let categoryObj = [];
        categoryObj = parseCategories(caption);

        // create coffeeshop Data
        const shop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            description,
            open,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            // get or create categories
            ...(categoryObj.length > 0 && {
              categories: {
                create: categoryObj,
              },
            }),
            // upload photo(arg name = file)
            ...(fileUrl.length > 0 && {
              photos: {
                create: fileUrl,
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
