import { NextFunction, Request, Response } from 'express';
import CreateUserDTO from '../dtos/createUser.dto';
import { validate } from 'class-validator';
import SignInDTO from '../dtos/signIn.dto';
import { StatusCodes } from 'http-status-codes';
import BadRequest from '../errors/badRequest';

export async function createUserValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const incomingRequest: CreateUserDTO = new CreateUserDTO(
    req.body.name,
    req.body.email,
    req.body.password
  );

  const errors = await validate(incomingRequest);

  if (errors.length > 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  next();
}

export async function signInUserValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const incomingRequest: SignInDTO = new SignInDTO(
    req.body.email,
    req.body.password
  );

  const errors = await validate(incomingRequest);

  if (errors.length > 0) {
    const errorResponse = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors: new BadRequest(errorResponse),
    });
  }

  next();
}
