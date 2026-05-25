/**
 * Thrown when stage input validation fails.
 * Each stage validates its preconditions before processing.
 */
export class ValidationError extends Error {
  constructor(stageName: string, message: string) {
    super(`Validation failed in ${stageName}: ${message}`);
    this.name = 'ValidationError';
  }
}
