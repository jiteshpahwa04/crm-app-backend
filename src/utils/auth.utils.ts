import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWTDecodedUser } from '../types/JWTDecodedUser';

export function generateJWT(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    roles: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '3h',
  });
  return token;
}

export function verifyJWT(token: string): JWTDecodedUser {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JWTDecodedUser;
}
