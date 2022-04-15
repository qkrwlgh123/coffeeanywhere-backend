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

  console.log(upload);
  return upload.Location;
};
