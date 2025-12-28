import { PrismaClient, User } from '@prisma/client';
import CreateUserDTO from '../dtos/createUser.dto';
const prisma = new PrismaClient();

class UserRepository {
  async create(userDetails: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: userDetails,
    });
    return user;
  }

  async get(userId: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = prisma.user.findMany();
    return users;
  }

  async delete() {}

  async update() {}
}

export default UserRepository;
