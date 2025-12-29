import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

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
