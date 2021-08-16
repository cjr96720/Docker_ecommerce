var express = require("express");
var apirouter = express.Router();
var env = require('dotenv').config({path: __dirname + '/.env'});
var connection = require("../models/connection.js");
var FacebookStrategy = require("passport-facebook").Strategy;
var passport = require("passport");


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/secrets
apirouter.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
apirouter.get('/facebook/socialauth', 
  passport.authenticate('facebook', 
    { successRedirect: '/',
      failureRedirect: '/account/login' }));

passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID_FB,
  clientSecret: process.env.CLIENT_SECRET_FB,
  callbackURL: "http://localhost:3000/auth/facebook/socialauth"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
}
));

module.exports = apirouter;
