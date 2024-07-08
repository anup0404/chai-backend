import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


import { v2 as cloudinary } from 'cloudinary';


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:  process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_API_SECRET
    });
    
    const uploadOnCloudinary=async (localFilePath)=>{
        try{
            if(!localFilePath) return null;

            // upload the file on cloudinary
            const response=await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            //file has been uploaded sucessfull

            console.log('file is uploaded on cloudinary !!!' ,
            response.url);
            return response.url;
        } catch(error){
            fs.unlinkSync(localFilePath) // remove the locally saved temporary file  as upload operation got faled
            console.log('error while uploading file on cloudinary',error);
            return null;
        }
    }

    export {uploadOnCloudinary}

