import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from 'aws-sdk';

const BUCKET_NAME = "creamhubereats321"

@Controller('uploads')
export class UploadsController{
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        AWS.config.update({
            credentials:{
                accessKeyId: 'AKIAVV5BCZUAHYGE4I63',
                secretAccessKey:'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'
            },
        });
        try{
            const upload = await new AWS.S3().putObject({
                Body:file.buffer,
                Bucket: BUCKET_NAME,
                Key: `${Date.now() + file.originalname}`
            }).promise()
            console.log(upload);
        }catch(error){
            console.log(error)
        }
}
}