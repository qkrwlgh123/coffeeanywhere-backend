import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: 'ap-northeast-2',
});

export const uploadToS3 = async (file, userId) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `uploads/${userId}-${Date.now()}-${filename}`;
  const upload = await new AWS.S3()
    .upload({
      Bucket: 'nomadcoffee1024-uploads',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();

  return upload.Location;
};

export const deleteFromS3 = async (fileUrl) => {
  const filePath = decodeURI(fileUrl).split('/uploads/')[1];
  const params = {
    Bucket: 'nomadcoffee1024-uploads/uploads',
    Key: filePath,
  };
  await new AWS.S3()
    .deleteObject(params, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    })
    .promise();
};

export const uploadAllToS3 = async (files, userId) => {
  let locationArr = [];
  for (let i in files) {
    const { filename, createReadStream } = await files[i];
    const readStream = createReadStream();
    const objectName = `uploads/${userId}-${Date.now()}-${filename}`;
    const upload = await new AWS.S3()
      .upload({
        Bucket: 'nomadcoffee1024-uploads',
        Key: objectName,
        ACL: 'public-read',
        Body: readStream,
      })
      .promise();
    locationArr.push({ url: upload.Location });
  }
  return locationArr;
};

export const deleteAllFromS3 = async (urls) => {
  urls = await urls.map((item) => ({
    Key: `uploads/${decodeURI(item.url).split('/uploads/')[1]}`,
  }));

  const params = {
    Bucket: 'nomadcoffee1024-uploads',
    Delete: {
      Objects: urls,
    },
  };
  await new AWS.S3()
    .deleteObjects(params, (error, data) => {
      if (error) {
        console.log('에러', error);
      } else {
        console.log('삭제됨', data);
      }
    })
    .promise();
};
