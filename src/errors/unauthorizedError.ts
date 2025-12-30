import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import GenericError from './genericError';

export default class UnauthorizedError extends GenericError {
  constructor(message?: string) {
    const errorMessage: string =
      message || 'You are not authorized to access this resource';
    super(
      StatusCodes.UNAUTHORIZED,
      ReasonPhrases.UNAUTHORIZED,
      errorMessage,
      'UnauthorizedError'
    );
  }
}
