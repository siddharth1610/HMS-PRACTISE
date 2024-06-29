import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 
import ApiResponse from "../utils/Apiresponse.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";

export const patientRegister = asyncHandler(async(req,res)=>{
    const {firstName,lastName,email, phone,aadhar, dob, gender, password, role
  } = req.body
  if (!firstName||!lastName||!email || !phone || !aadhar || !dob|| !gender || !password || !role){
    throw (new ApiError("please fill form!!", 400))
  }
    let user = await User.findOne({email});
    if(user){
        throw (new ApiError("User already Registered",400))
    }

    user = await User.create({
        firstName,lastName,email, phone,aadhar, dob, gender, password, role

    })
    
generateToken(user, "Login Successfully!", 201, res);
})
export const login = asyncHandler(async(req,res)=>{
    const{email , password, confirmPassword ,role} = req.body  //we send static value from frontend
    if(!email ||! password||! confirmPassword ||!role){
        throw (new ApiError("Please provide all details!!",400))
    }
    if(password !== confirmPassword){
        throw (new ApiError("Password and confirm passowrd doesnt match!!",400))
    }
    let user = await User.findOne({email}).select("+password")
    if(!user){
        throw (new ApiError("Invalid Password or Email",400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        throw (new ApiError("Invalid Password or Email",400))
    }
    if (role !== user.role) {
        throw(new ApiError(`User Not Found With This Role!`, 400));
      }

    
    generateToken(user, "Login Successfully!", 201, res);
})

export const addNewAdmin = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, aadhar, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !aadhar ||
      !dob ||
      !gender ||
      !password
    ) {
      throw(new ApiError("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      throw (new ApiError("Admin With This Email Already Exists!", 400));
    }
  
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      aadhar,
      dob,
      gender,
      password,
      role: "Admin",
    });
   return res.status(200).json(
    new ApiResponse(200,{},"New Admin Registered")
    );
  });

  export const getAllDoctors = asyncHandler(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
   return res.status(200).json(
      new ApiResponse(200,doctors,"All DOCTORS!!")
    );
  });

  export const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = req.user;
    return res.status(200).json(
        new ApiResponse(200,user)
    );
  });

  // Logout function for dashboard admin
export const logoutAdmin = asyncHandler(async (req, res, next) => {
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure:true,
        sameSite: "None",
      })
      .json(new ApiResponse(201,"Admin Logged Out Successfully.") ,
      );
  });
  // Logout function for frontend patient
  export const logoutPatient = asyncHandler(async (req, res, next) => {
    res
      .status(201)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure:true,
        sameSite: "None",
      })
      .json(
        new ApiResponse(201,"Patient Logged Out Successfully.")
        
      );
  });