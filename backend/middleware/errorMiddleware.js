const colors = require('colors');

const errorHandler = (err,req,res,next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  console.error(err.stack.red);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV==="development" ? err.stack : null
  })
};

module.exports = {
  errorHandler,
}