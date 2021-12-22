const AWS = require("aws-sdk");
const config = require("../config}");
const AppError = require("../errors/appError");

class ImageRepository {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.privateAccessKey,
    });
  }

  async uploadImage(name, image) {
    const params = {
      Bucket: config.aws.s3BucketName,
      Key: name,
      Body: image,
    };

    this.s3.upload(params, (err, data) => {
      if (err) {
        throw new AppError(err.message, 502);
      }

      // TODO: 1. ARMAR URL DE DESCARGA DE IMAGEN Y RETORNARLA
      // - 2 ACTUALIZAR LA TABLA DE PERSONAJES O PELICULA  ( EN OTRA CAPA )
      console.log(`########### Image location: ${data.location}`);
      return data.location;
    });
  }
}

module.exports = ImageRepository;
