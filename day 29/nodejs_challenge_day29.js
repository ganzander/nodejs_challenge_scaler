function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    errorMessage = err.message;
  }
  console.error(err);
  res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;
