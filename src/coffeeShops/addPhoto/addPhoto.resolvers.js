import client from '../../client';
import { uploadToS3 } from '../../shared/shared.utils';

export default {
  Mutation: {
    addPhoto: async (_, { id, file }, { loggedInUser }) => {
      // S3에 업로드
      let fileUrl;
      if (file) {
        fileUrl = await uploadToS3(file, loggedInUser.id);
      }
      // 백엔드 DB에 업로드
      await client.coffeeShop.update({
        where: {
          id,
        },
        data: {
          photos: {
            create: {
              url: fileUrl,
            },
          },
        },
      });
      return {
        ok: true,
      };
    },
  },
};
