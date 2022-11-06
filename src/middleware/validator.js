const { body, validationResult } = require("express-validator");

// THIS MIDDLEWARE RUNS A VALIDATION ON THE USER INPUT WHEN A SIGN UP OCCURS
function validateUser() {
  return [
    body("firstname").notEmpty().isString(),
    body("lastname").notEmpty().isString(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isString(),
  ];
}

function validate(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => {
    extractedErrors.push({ [err.param]: err.msg });
  });

  return res.status(401).json({ message: extractedErrors });
}

module.exports = { validateUser, validate };
