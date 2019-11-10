import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middleware/async';
import { User } from '../models/User';
import { HttpException } from '../utils/HttpExecption';

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.find();
    const count = await User.countDocuments();
    res.status(200).json({
      success: true,
      data,
      count
    });
  }
);

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(
        new HttpException(404, 'User with that email already exists.')
      );
    }

    user = await User.create(req.body);

    res.status(200).json({
      success: true,
      data: user
    });
  }
);
