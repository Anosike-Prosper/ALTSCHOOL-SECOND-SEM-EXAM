const handleDuplicateErrorDB = (err) => {
  const value = err.keyValue.title;
  const message = `Duplicate field value ${value}. Please use another value.`;
  return new AppError(message, 400);
};
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  console.log(err.name);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: `something went wrong`,
    });
  }
};

const globalError = (err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, name: err.name };
    if (error.name === "CastError") {
      error = handleCastError(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateErrorDB(error);
    }

    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
      // console.log(error);
    }
    sendErrorProd(error, res);
  }
};

module.exports = { globalError };
