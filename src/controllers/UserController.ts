import express from 'express';
import { createUser, getUsers } from '../services/UserService';

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post(createUser);

export default router;
