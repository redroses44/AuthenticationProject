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

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.findById(req.params.id);

    if (!data) {
      return next(
        new HttpException(404, `User with id ${req.params.id} not found`)
      );
    }
    data.remove();
    res.status(200).json({
      success: true
    });
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!data) {
      return next(
        new HttpException(404, `User with id ${req.params.id} not found`)
      );
    }
    res.status(200).json({
      success: true,
      data
    });
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.findById(req.params.id);
    if (!data) {
      return next(
        new HttpException(404, `User with id ${req.params.id} not found`)
      );
    }
    res.status(200).json({
      success: true,
      data
    });
  }
);
