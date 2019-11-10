import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middleware/async';
import { User } from '../models/User';
import { HttpException } from '../utils/HttpExecption';

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(
        new HttpException(404, 'User with that email already exists.')
      );
    }

    user = await User.create(req.body);
    user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpException(400, 'Credentials missing.'));
    }
  }
);

export const loginWithFacebook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
      success: true,
      data: req.user
    });
  }
);
