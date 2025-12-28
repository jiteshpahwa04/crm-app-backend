import express from 'express';
import userController from '../../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:id', userController.getUserByIdHandler);
userRouter.get('/', userController.getAllUsersHandler);

export default userRouter;
