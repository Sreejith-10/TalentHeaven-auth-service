import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import jwt from "jsonwebtoken"

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log({ profile })
      done(null, { profile, token: accessToken })
    } catch (error) {
      console.log({ error })
      done(error, null)
    }
  }
))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

export default passport
