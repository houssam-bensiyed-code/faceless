/**
 * Represents the current execution state of the pipeline.
 */
export enum PipelineStatus {
  IDLE      = 'idle',
  RUNNING   = 'running',
  COMPLETED = 'completed',
  FAILED    = 'failed',
}
