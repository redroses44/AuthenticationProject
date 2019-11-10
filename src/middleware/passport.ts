import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import { User } from '../models/User';

export const facebookLogin = passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (user) {
          return done(null, user);
        }

        user = new User({
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        });
        await user.save();
        done(null, user);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
