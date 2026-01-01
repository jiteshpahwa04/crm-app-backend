import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JWTDecodedUser } from './JWTDecodedUser';

export interface RequestWithUser extends Request {
  user: JWTDecodedUser;
}
