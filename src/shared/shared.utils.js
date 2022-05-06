import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
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
  const filePath = fileUrl.split('/uploads/')[1];
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
