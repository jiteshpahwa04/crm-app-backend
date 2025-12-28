import { Request, Response } from 'express';
import UserService from '../services/user.service';
import UserRepository from '../repositories/user.repository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error in getUserHandler:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error in getAllUsersHandler:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
export default { getUserByIdHandler, getAllUsersHandler };
