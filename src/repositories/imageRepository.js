const AWS = require("aws-sdk");
const { reject } = require("bcrypt/promises");
const config = require("../config");
const AppError = require("../errors/appError");

class ImageRepository {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.privateAccessKey,
    });
  }

  uploadImage(name, image, type) {
    const Key = `${name}.${type.split("/")[1]}`;
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.aws.s3BucketName,
        Key,
        Body: image,
        ContentType: type,
        ACL: "public-read",
      };

      this.s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(new AppError(err.message, 502));
        }

        // TODO: 1. ARMAR URL DE DESCARGA DE IMAGEN Y RETORNARLA
        // - 2 ACTUALIZAR LA TABLA DE PERSONAJES O PELICULA  ( EN OTRA CAPA )
        console.log(`########### Image location: ${JSON.stringify(data)}`);
        resolve(data.Location);
      });
    });
  }

  deleteImage(name, type) {
    const Key = `${name}.${type.split("/")[1]}`;
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.aws.s3BucketName,
        Key,
      };

      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(true);
        }

        // TODO: 1. ARMAR URL DE DESCARGA DE IMAGEN Y RETORNARLA
        // - 2 ACTUALIZAR LA TABLA DE PERSONAJES O PELICULA  ( EN OTRA CAPA )
        console.log(`########### Image location: ${JSON.stringify(data)}`);
        resolve(data.Location);
      });
    });
  }
}

module.exports = ImageRepository;
