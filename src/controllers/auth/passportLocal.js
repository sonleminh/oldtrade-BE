const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');
const LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const user = await User.findOne({
          email,
        });
        if (!user) return done(null, false);
        try {
          const checkPassword = bcrypt.compareSync(password, user.password);

          if (checkPassword) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        } catch (error) {
          console.log(error);
          return done(null, false);
        }
      }
    )
  );
};

passport.serializeUser(function (user, done) {
  if (user) return done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = initPassportLocal;
