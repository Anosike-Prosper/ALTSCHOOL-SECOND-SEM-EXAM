const passport = require("passport");

const userModel = require("../models/userModel");

require("dotenv").config();

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

exports.jwtPassport = passport.use(
  new JWTstrategy(opts, async (payload, done) => {
    const user = await userModel.findById(payload.id);
    try {
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
