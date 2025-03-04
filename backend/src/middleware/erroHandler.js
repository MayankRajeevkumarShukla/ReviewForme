const erroHandler = (err,req,res,next)=>{
console.log(err.stack)
 const statusCode = err.statusCode || 500;
 res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message: err.message || "Internal Server Error",
    },
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
 })
}
module.exports = erroHandler;