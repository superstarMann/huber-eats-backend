import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS  from 'aws-sdk'

const BUCKET_NAME = 'ucmaltguarder';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
          accessKeyId: 'AKIAVV5BCZUAMBFUSVG2',
          secretAccessKey:'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'
        }
      })
      try {
        const objectName = `${Date.now() + file.originalname}`;
        await new AWS.S3()
          .putObject({
            Body: file.buffer,
            Bucket: BUCKET_NAME,
            Key: objectName,
            ACL: 'public-read',
          })
          .promise();
        const url = `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${objectName}`;
        return { url };
      } catch (e) {
        return null;
      }
    }
  }