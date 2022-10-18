/**
 * Extends Javascript Error and attach code and details in to it
 * @param code Error code
 * @param details Error details (Optional)
 */
export class CustomError extends Error {
  code: string;
  details: any;
  constructor(code: string, details?: any) {
    super();

    this.code = code;
    this.details = details;

    // For instanceof CustomError to work in Typescript
    // @see https://stackoverflow.com/questions/55065742/implementing-instanceof-checks-for-custom-typescript-error-instances
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
