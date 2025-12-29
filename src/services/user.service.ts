import { User } from '@prisma/client';
import UserRepository from '../repositories/user.repository';
import CreateUserDTO from '../dtos/createUser.dto';
import bcrypt from 'bcryptjs';
import { SERVER_CONFIG } from '../config/server.config';
import { generateJWT } from '../utils/auth.utils';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user: User | null = await this.userRepository.get(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.getAll();
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  async createUser(userDetails: CreateUserDTO): Promise<User> {
    try {
      // Encrypt password logic can be added here before creating the user
      const salt = bcrypt.genSaltSync(Number(SERVER_CONFIG.SALT_ROUNDS));
      const hashedPassword = bcrypt.hashSync(userDetails.password, salt);
      userDetails.password = hashedPassword;
      const newUser: User = await this.userRepository.create(userDetails);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async signInUser(email: string, password: string): Promise<string> {
    try {
      const user: User | null = await this.userRepository.getByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
      const jwtToken = generateJWT(user);
      return jwtToken;
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
  }
}

export default UserService;
