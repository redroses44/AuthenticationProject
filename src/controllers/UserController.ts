import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../services/UserService';

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .delete(deleteUser)
  .get(getUser)
  .put(updateUser);

export default router;
