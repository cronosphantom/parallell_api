import { Endpoint, S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import fs from "fs";
import CryptoJS from 'crypto-js';
import sharp from 'sharp';
import imageToBase64 from 'image-to-base64';

export const LinodeS3Upload = (base64Img: string): Promise<string> => {

  return new Promise<string>(async (res, rej) => {
     
    // let base64Img = await imageToBase64(__dirname + '/01.jpg');
    // console.log(base64Img);
    // res(base64Img);
    // return;

    let linodeEndpoint : any = process.env.LINODE_ENDPOINT;
    let linodeAccessKey : any = process.env.LINODE_ACCESS_KEY;
    let linodeSecretKey : any = process.env.LINODE_SECRET_KEY;
    let bucketRegion : any = process.env.LINODE_BUCKET_REGION;

    if (base64Img == '') rej('failed');

    var fileName = "img_" + CryptoJS.MD5(new Date().toString()).toString() + ".png";
    
    base64Img = base64Img.replace("data:image/jpeg;base64,", "");

    fs.writeFileSync(fileName, base64Img, 'base64');

    // const fileContent = fs.readFileSync(fileName);

    let resizedFileContent;

    try {
      resizedFileContent = await sharp(fileName)
      .resize(300)
      .png()
      .toBuffer();
    } catch (error) {
      console.log("error found")
      
      fs.unlinkSync(fileName);

      rej('error');
      throw error;
    }
    

    const endPoint = new Endpoint(linodeEndpoint);

    const s3 = new S3({
      endpoint: endPoint,
      accessKeyId: linodeAccessKey,
      secretAccessKey: linodeSecretKey,
      region: bucketRegion
    })

    const params = {
      Bucket: 'entwine-photos',
      Key: fileName, // File name you want to save as in S3
      ACL: 'public-read',
      ContentType: 'image/png',
      Body: resizedFileContent
    };

    s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
      
      fs.unlinkSync(fileName);

      if (err) {
        console.log('Error ===>', err);
        rej('error');
        throw err;
      }

      console.log('data ===>', data);
      res(data.Location);
    })
  })
}

export const LinodeS3Delete = (objName: string): Promise<string> => {

  return new Promise<string>(async (res, rej) => {
    let linodeEndpoint : any = process.env.LINODE_ENDPOINT;
    let linodeAccessKey : any = process.env.LINODE_ACCESS_KEY;
    let linodeSecretKey : any = process.env.LINODE_SECRET_KEY;
    let bucketRegion : any = process.env.LINODE_BUCKET_REGION;

    const endPoint = new Endpoint(linodeEndpoint);

    const s3 = new S3({
      endpoint: endPoint,
      accessKeyId: linodeAccessKey,
      secretAccessKey: linodeSecretKey,
      region: bucketRegion
    })

    const params = {
      Bucket: 'entwine-photos',
      Key: objName
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('Error ===>', err);
        rej('error');
      }

      console.log('data ===>', data);
      res('success');
    })
  })
}