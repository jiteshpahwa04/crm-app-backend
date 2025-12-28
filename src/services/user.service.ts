import { User } from '@prisma/client';
import UserRepository from '../repositories/user.repository';
import CreateUserDTO from '../dtos/createUser.dto';

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
      const newUser: User = await this.userRepository.create(userDetails);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

export default UserService;
