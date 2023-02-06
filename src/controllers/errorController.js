const AppError = require("../../utils/appError");

const handleDuplicateErrorDB = (err) => {
  let value;
  if (err.keyValue.title) {
    value = err.keyValue.title;
  } else {
    value = err.keyValue.email;
  }
  const message = `Duplicate field value ${value}. Please use another value.`;
  return new AppError(message, 400);
};
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError("Invalid token.Please login again", 401);
};

const handleJWTExpiredError = () => {
  return new AppError("Your token has expired.Please login again", 401);
};

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
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
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log(err.message);
    let error = { ...err, name: err.name };

    if (error.name === "CastError") {
      error = handleCastError(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateErrorDB(error);
    }

    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }
    sendErrorProd(error, res);
  }
};

module.exports = { globalError };
