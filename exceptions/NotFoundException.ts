import { type NotFoundEntity } from './NotFoundEntities';

export class NotFoundException extends Error {
  statusCode: number;
  errorCode: string;
  details?: Record<string, object>;

  constructor(
    entity: NotFoundEntity,
    options?: { details?: Record<string, object>; errorCode?: string },
  ) {
    super(`${entity} Not Found`);
    this.name = 'NotFoundException';
    this.statusCode = 401;
    this.errorCode = options?.errorCode ?? 'NOT_FOUND_001';
    this.details = options?.details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundException);
    }
  }
}
