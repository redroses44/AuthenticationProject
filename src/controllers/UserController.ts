import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../services/UserService';

const userRouter = express.Router();

userRouter.route('/').get(getUsers);

userRouter
  .route('/:id')
  .delete(deleteUser)
  .get(getUser)
  .put(updateUser);

export default userRouter;
