export enum ErrorCode {
  INVALID_OPTIONS = 'INVALID_OPTIONS',
  TEMPLATE_NOT_FOUND = 'TEMPLATE_NOT_FOUND',
  PROCESSING_FAILED = 'PROCESSING_FAILED',
  FILE_SYSTEM_ERROR = 'FILE_SYSTEM_ERROR',
}

export class BunzillaError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'BunzillaError';
  }
} 