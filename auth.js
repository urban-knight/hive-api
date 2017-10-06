var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("./config/jwt.js");
var User = require("./models/user.js");

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const { promisifyAll } = require('bluebird');
const mongoose = require('mongoose');
promisifyAll(mongoose);

module.exports = ()=>{
    var strategy = new Strategy(params, async (payload, done) =>{
        const user = await User.findByIdAsync(payload.id);
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });

    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};