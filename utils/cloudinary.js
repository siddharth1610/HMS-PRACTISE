import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (Avatar)=>{
    try{
      const response = await cloudinary.uploader
        .upload(Avatar.tempFilePath, {
            resource_type: "auto"
        })
        console.log(response);
        fs.unlinkSync(Avatar.tempFilePath)
        return response;

    }catch(error){
        fs.unlinkSync(Avatar.tempFilePath)
            return null;
        
    }
}
export {uploadCloudinary}