import { StatusCodes } from 'http-status-codes';
import GenericError from './genericError';

export default class BadRequest extends GenericError {
  constructor(reason: string | object | null = null) {
    const errorMessage: string =
      'There are some invalid or missing fields in the request';
    super(StatusCodes.BAD_REQUEST, reason, errorMessage, 'BadRequest');
  }
}
