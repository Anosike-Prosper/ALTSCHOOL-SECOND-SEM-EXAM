const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      //   console.log("na here i dey", err);
      next(err);
    });
  };
};

module.exports = { catchAsync };
