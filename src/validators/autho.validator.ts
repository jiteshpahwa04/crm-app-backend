import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UnauthorizedError from '../errors/unauthorizedError';
import { verifyJWT } from '../utils/auth.utils';
import { RequestWithUser } from '../types/RequestWithUser';
import { JWTDecodedUser } from '../types/JWTDecodedUser';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers['x-access-token']) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      err: new UnauthorizedError(),
      data: {},
      success: false,
      message: 'You are not authorized to do this operation',
    });
  }

  const token = req.headers['x-access-token'];
  let decodedToken;

  try {
    decodedToken = verifyJWT(token as string);
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      err: new UnauthorizedError(),
      data: {},
      success: false,
      message: 'You are not authorized to do this operation',
    });
  }

  (req as RequestWithUser).user = decodedToken;

  next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user: JWTDecodedUser = (req as RequestWithUser).user;
  if (user && user.roles && user.roles.includes('admin')) {
    next();
  } else {
    return res.status(StatusCodes.FORBIDDEN).json({
      err: new UnauthorizedError('Admin privileges required'),
      data: {},
      success: false,
      message: 'You do not have permission to perform this operation',
    });
  }
}
