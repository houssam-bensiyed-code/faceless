/**
 * Thrown when an IdeaObject fails structural validation
 * (missing required fields, invalid types, etc.).
 */
export class InvalidIdeaError extends Error {
  constructor(ideaId: string, reason: string) {
    super(`Invalid idea "${ideaId}": ${reason}`);
    this.name = 'InvalidIdeaError';
  }
}
