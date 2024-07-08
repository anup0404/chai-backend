import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
 // get user details from  fronted
 //validation -not empty
 //check if user already exits:username,email
 //check for images,check for avtar
 //upload then to cloudinary
 //create user -create entry in db
 //remove password and refresh token field from response
 //check for user creation 
 // return res

 const {fullname,email,usename,password} =req.body
 console.log('email',email);
if(
    [fullname,email,username,password].some((field)=>field?.trim()==='')
){
    throw new ApiError(400,'please fill all the fields')
}
const existedUser=User.findOne({
    $or:[{email}, {username}]
})
if(existedUser){
    throw new ApiError(409,'User with email or username already exits')
}

const avatarLocalPath=req.files?.avatar[0]?.path;
const ImageLocalPath=req.files?.coverImage[0]?.path;
if(!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required")
}
const avatar= await uploadOnCloudinary(avatarLocalPath);
const coverImage= await uploadOnCloudinary(ImageLocalPath);

if(!avatar){
    throw new ApiError(400,"Avatar file is required")
}
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    username:username.toLowerCase(),
    password,
})
const createdUser= await User.findById(user._id).select("-password -refreshToken")
if(!createdUser){
    throw new ApiError(500,"Something went wrong while  regristering the user")
}
return res.status(201).json(
    new ApiResponse(200,createdUser,'User registered Successfully')
)
});

export { registerUser };