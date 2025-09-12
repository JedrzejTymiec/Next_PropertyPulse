export class UnauthorizedException extends Error {
  statusCode: number;
  errorCode: string;
  details?: Record<string, object>;

  constructor(options?: { details?: Record<string, object>; errorCode?: string }) {
    super('Unauthorized');
    this.name = 'UnauthorizedException';
    this.statusCode = 401;
    this.errorCode = options?.errorCode ?? 'AUTH_001';
    this.details = options?.details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedException);
    }
  }
}
