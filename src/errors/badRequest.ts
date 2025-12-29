import { StatusCodes } from 'http-status-codes';

export default class BadRequest extends Error {
  statusCode: number;
  reason: string | object | null;
  errorMessage: string;
  constructor(reason: string | object | null = null) {
    const errorMessage: string =
      'There are some invalid or missing fields in the request';
    super(errorMessage);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.reason = reason;
    this.errorMessage = errorMessage;
    this.name = 'BadRequest';
  }
}
