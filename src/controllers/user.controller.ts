import { Request, Response } from 'express';
import UserService from '../services/user.service';
import UserRepository from '../repositories/user.repository';
import { StatusCodes } from 'http-status-codes';
import GenericError from '../errors/genericError';
import { unkownErrorResponse } from '../utils/response.utils';

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
    if (error instanceof GenericError) {
      return res.status(error.statusCode).json({
        message: 'Something went wrong',
        success: false,
        error: error,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unkownErrorResponse);
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
    if (error instanceof GenericError) {
      return res.status(error.statusCode).json({
        message: 'Something went wrong',
        success: false,
        error: error,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unkownErrorResponse);
  }
};

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const userDetails = req.body;
    const newUser = await userService.createUser(userDetails);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.error('Error in createUserHandler:', error);
    if (error instanceof GenericError) {
      return res.status(error.statusCode).json({
        message: 'Something went wrong',
        success: false,
        error: error,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unkownErrorResponse);
  }
};

const signInUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const jwtToken = await userService.signInUser(email, password);
    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: jwtToken,
    });
  } catch (error) {
    console.error('Error in signInUserHandler:', error);
    if (error instanceof GenericError) {
      return res.status(error.statusCode).json({
        message: 'Something went wrong',
        success: false,
        error: error,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unkownErrorResponse);
  }
};

export default {
  getUserByIdHandler,
  getAllUsersHandler,
  createUserHandler,
  signInUserHandler,
};
