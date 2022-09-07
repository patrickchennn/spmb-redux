const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel.js");

const protect = asyncHandler(async (req,res,next) => {
  let token;

  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ){
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token and exclude password field
      req.user = await userModel.findById(decoded.id).select("-password");

      // console.log(req.headers);
      console.log("req.user: ",req.user);
      next();
    } catch (error) {
      console.error(`[Error]: ${error}`.red);
      res.status(401).send(error);
      throw new Error(error);
    }
  }
  if(!token){
    res.status(401).send("Not authorized. No token")
    throw new Error("Not authorized. No token");
  }
});

module.exports = {protect};