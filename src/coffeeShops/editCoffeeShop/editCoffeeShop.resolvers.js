import {
  deleteAllFromS3,
  deleteFromS3,
  uploadAllToS3,
  uploadToS3,
} from '../../shared/shared.utils';
import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { parseCategories } from '../coffeeShops.utils';

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, caption, description, open, file, deleteFromS3 },
        { loggedInUser }
      ) => {
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
        if (deleteFromS3.length > 0) {
          deleteFromS3 = await deleteFromS3.map((item) => ({
            url: item,
          }));
          await deleteAllFromS3(deleteFromS3);
        }
        // 업로드할 파일의 목록들 : 객체와 스트링이 섞여있음
        if (file.length === 0) {
          await deleteAllFromS3(exist.photos);
        }
        let fileUrl = [];
        if (file.length > 0) {
          for (let i in file) {
            // File 객체 : 새로 들어온 파일 => 업로드
            if (typeof file[i] === 'object') {
              const url = await uploadToS3(file[i], loggedInUser.id);
              fileUrl.push({ url });
            }
          }
        }

        // update information in CoffeeShop

        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            description,
            open,
            ...(file.length === 0 && {
              photos: {
                deleteMany: exist.photos,
              },
            }),

            ...((fileUrl.length > 0 || deleteFromS3.length > 0) && {
              photos: {
                deleteMany: deleteFromS3,
                create: fileUrl,
              },
            }),

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
