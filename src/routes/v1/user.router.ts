import express from 'express';
import userController from '../../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:id', userController.getUserByIdHandler);
userRouter.get('/', userController.getAllUsersHandler);
userRouter.post('/', userController.createUserHandler);

export default userRouter;
