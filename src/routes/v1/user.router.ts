import express from 'express';
import userController from '../../controllers/user.controller';
import { createUserValidator } from '../../validators/user.validator';

const userRouter = express.Router();

userRouter.get('/:id', userController.getUserByIdHandler);
userRouter.get('/', userController.getAllUsersHandler);
userRouter.post(
  '/signup',
  createUserValidator,
  userController.createUserHandler
);
userRouter.post('/signin', userController.signInUserHandler);

export default userRouter;
