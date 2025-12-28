import { NextFunction, Request, Response } from 'express';
import CreateUserDTO from '../dtos/createUser.dto';
import { validate } from 'class-validator';

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
    res.status(400).json({
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
