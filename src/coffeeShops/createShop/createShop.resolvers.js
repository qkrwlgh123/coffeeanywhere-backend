import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { parseCategories } from '../coffeeShops.utils';

export default {
  Mutation: {
    createShop: protectedResolver(
      async (
        _,
        { name, caption, latitude, longitude, file },
        { loggedInUser }
      ) => {
        // parse categories from caption(ok)
        let categoryObj = [];
        categoryObj = parseCategories(caption);

        // create coffeeshop Data
        return client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            // get or create categories
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
            // upload photo(arg name = file)
            ...(file && {
              photos: {
                create: {
                  url: file,
                },
              },
            }),
          },
        });
      }
    ),
  },
};
