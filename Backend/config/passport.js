const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const User = require('../models/auth')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:1000/google/callback"
  },
  async(accessToken, refreshToken, profile, cb) => {
    try {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : ''
        const avatar = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : ''

        let user = await User.findOne({ email })

        if (!user) {
          user = await User.create({
            google: profile.id,
            name: profile.displayName,
            email: email,
            avatar: avatar
          })
        }
        return cb(null, user)
    }
    catch (error) {
      return cb(error, null)
    }
  }
));