const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");

const initializePassport = (passport, users) => {
  passport.use(
    new LocalStrategy({
      usernameField: "username"
    },
      async (username, password, done) => {
        const user = users.getUserByUsername(username);
        if (user == null) {
          return done(null, false, { message: "No user with that username" });
        }

        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (e) {
          return done(e);
        }
      }));

  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    },
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          username: profile.emails[0].value,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        }

        let user = users.getUserById(profile.id);

        if (user) {
          done(null, user)
        } else {
          user = users.saveGoogleAccount(newUser);
          done(null, user)
        }
      }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, users.getUserById(id));
  });
}

module.exports = initializePassport;
