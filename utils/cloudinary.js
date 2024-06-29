import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (Avatar)=>{
    try{
        if(!Avatar) return null
        const response = await await cloudinary.uploader
        .upload(Avatar, {
            resource_type: "auto"
        })
        fs.unlinkSync(Avatar)
        return response;

    }catch(error){
        fs.unlinkSync(Avatar)
            return null;
        
    }
}
export {uploadCloudinary}