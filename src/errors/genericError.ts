export default class GenericError extends Error {
  public statusCode: number;
  public reason: string | object | null;
  public name: string;
  public errorMessage: string;

  constructor(
    statusCode?: number,
    reason?: string | object | null,
    errorMessage?: string,
    name?: string
  ) {
    super(errorMessage);
    this.statusCode = statusCode || 500;
    this.reason = reason || null;
    this.errorMessage = errorMessage || 'An error occurred';
    this.name = name || 'GenericError';
  }
}
