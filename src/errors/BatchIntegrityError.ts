/**
 * Thrown when a batch ID mismatch is detected during save.
 * This indicates that the data store was modified by another process
 * between read and write, violating transactional integrity.
 */
export class BatchIntegrityError extends Error {
  constructor(expectedBatchId: string, actualBatchId: string) {
    super(
      `Batch integrity violation: expected batchId "${expectedBatchId}" but found "${actualBatchId}". ` +
      `The data store was modified by another process.`
    );
    this.name = 'BatchIntegrityError';
  }
}
