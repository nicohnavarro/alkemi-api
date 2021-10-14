import AWS from "aws-sdk";
import { aws } from "../config/index.js";
import AppError from "../errors/appError.js";

class ImageRepository {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretKey,
    });
  }

  async uploadImage(name, image, type) {
    const Key = `${name}.${type.split("/")[1]}`;
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: aws.s3BucketName,
        Key,
        Body: image,
        ContentType: type,
        ACL: "public-read",
      };
      this.s3.upload(params, (err, data) => {
        if (err) {
          reject(new AppError(err.message, 502));
        }
        resolve(`https://${aws.s3BucketName}.s3.amazonaws.com/${Key}`);
      });
    });
  }

  deleteImage(Key){
    Key = Key.split('/')[3];
    return new Promise((resolve, reject)=> {
        const params = {
            Bucket: aws.s3BucketName,
            Key
        };
        console.log(params);
        this.s3.deleteObject(params, (err, data) => {
            if (err) {
                reject(new AppError(err.message, 502));
            }
            console.log(JSON.stringify(data));
            resolve(true);
        });
    })
    
}
}

export default ImageRepository;
