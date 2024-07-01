import { asyncHandler } from "../utils/asyncHandler.js";
import  ApiError  from "../utils/ApiError.js";
import Apiresponse from "../utils/Apiresponse.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = asyncHandler(async(req,res,next) => {
    const {message,phone,email,lastName,firstName} = req.body;
    if (!message || !phone || !email || !lastName || !firstName){
        throw (new ApiError("Please fill full form",400)
)}
    await Message.create({ firstName, lastName, email, phone, message });
  return res.status(200).json(
    new Apiresponse(200,{},"Message send succesfully")
  );
});

export const getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json(
    new Apiresponse(200,messages)
  );
});