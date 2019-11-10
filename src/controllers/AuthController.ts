import express from 'express';
import passport from 'passport';
import {
  createUser,
  loginUser,
  loginWithFacebook
} from '../services/AuthService';

const authRouter = express.Router();

authRouter.route('/register').post(createUser);
authRouter.route('/login').post(loginUser);
authRouter
  .route('/oauth/facebook')
  .post(
    passport.authenticate('facebook-token', { session: false }),
    loginWithFacebook
  );

export default authRouter;
