/**
 * Thrown when a pipeline run is requested while another is already in progress.
 */
export class ConcurrentExecutionError extends Error {
  constructor(message = 'Pipeline is already running. Concurrent execution is not allowed.') {
    super(message);
    this.name = 'ConcurrentExecutionError';
  }
}
