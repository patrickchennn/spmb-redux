const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel.js");
const studentDataModel = require("../model/studentDataModel.js")

/**
 * @desc Register user
 * @route POST /api/user/register
 * @access Public
 */
const registerUser = asyncHandler(async (req,res) => {
  const {name,email,password} = req.body;

  // if the user did not provide any of these data
  if(!name || !email || !password){
    res.status(400);
    throw new Error("please add all fields");
  }

  // if the user already exists
  const userExists = await userModel.findOne({email});
  if(userExists){
    res.status(400);
    throw new Error(`${email} is already exists.`);
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password,salt);

  const user = await userModel.create({name,email,password:hashedPw});
  if(!user){
    res.status(400);
    throw new Error("invalid user data");
  }

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
});


/**
 * @desc Authenticate a user
 * @route POST /api/user/login
 * @access Public
 */
const loginUser = asyncHandler(async (req,res) => {
  // get the sended email and password, then ...
  const {email,password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error(`Please fill in the gap to login.`);
  }
  
  const user = await userModel.findOne({email});
  // if the user does not exist
  if(!user){
    res.status(400);
    throw new Error(`User with email:${email} does not exist. Please register to login.`);
  }

  // if the password is incorrect
  if(!await bcrypt.compare(password,user.password)){
    res.status(400);
    throw new Error(`Wrong password.`);
  }
  
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
});


/**
 * @desc Get user data
 * @route GET /api/user/me
 * @access Private
 */
const getMe = asyncHandler(async (req,res) => {
  // console.log(`hey
  // ${req.user}`);

  res.json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});


/**
 * @desc Delete a user
 * @route DELETE /api/user/delete/:id
 * @access Public
 */
 const deleteUser = asyncHandler(async (req,res) => {
   console.log("delete user: ",req.user)
   const id = req.user._id.toString()
   console.log(id)
   const user = await userModel.findById(id)
   if(!user) {
    res.status(400)
    throw new Error("user does not exist")
  }
  const studentData = await studentDataModel.findById(id)
  if(!studentData){
    res.status(400)
    throw new Error("student data does not exist")
  }
  const userRemoveResponse = await userModel.findByIdAndRemove(id)
  const studentRemoveResponse = await studentDataModel.findByIdAndRemove(id)
  // console.log(userRemoveResponse)
  // console.log(studentRemoveResponse)

  res.status(201).json(`user account with email: ${req.user.email} were just deleted!`)
});



/**
 * @desc Generate JWT
 */
const generateToken = (id) => jwt.sign(
  {id},
  process.env.JWT_SECRET,
  {
    expiresIn:'30min',
  }
);

module.exports = {registerUser,loginUser,getMe,deleteUser};