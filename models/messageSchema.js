import mongoose from "mongoose";
import validator from "validator";


const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength: [3, "First name contains at least # Character"]
    },
    lastName:{
        type: String,
        required:true,
        minLength: [3, "Last name contains at least # Character"]
    },
    email:{
        type: String,
        required:true,
        validator:  [validator.isEmail, "Please provide valid email"]
    },
    phone:{
        type: String,
        required:true,
        maxLength: [10, "Phone number must contains at least 10 Digits"]
    },
    message:{
        type: String,
        required:true,
        minLength: [10, "Message must contains at least 10 Character"],
        maxLength: [300, "Message max limit is 300 Character"]
    }
})
export const Message = mongoose.model("Message", messageSchema)