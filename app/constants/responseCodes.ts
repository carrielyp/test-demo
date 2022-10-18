export enum ErrorCodes {
  CsrfError = "E0001",
  StaticDataTypeError = "StaticDataTypeError",
  ValidationError = "ValidationError",
  ServerError = "ServerError",
  FileError = "FileError",
  NetworkError = "NetworkError",
  FileSizeError = "FileSizeError",
  AuthError = "AuthError",
  AuthExpiredError = "AuthExpiredError",
  GeneralError = "GeneralError",
  TokenExpiredError = "TokenExpiredError",
  JsonWebTokenError = "JsonWebTokenError",
  NotBeforeError = "NotBeforeError",
  NotFoundError = "NotFoundError",
  DataNotFoundError = "DataNotFoundError",
  ForbiddenError = "ForbiddenError",
  GatewayTimeout = "GatewayTimeout",
  ConcurrentSessionError = "ConcurrentSessionError"
}

export enum ErrorMessage {
  DUPLICATE_CASE_CLIENT = "duplicate_case_client"
}
