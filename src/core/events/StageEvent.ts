/**
 * Event payload emitted by pipeline stages during execution.
 * All events carry pipelineRunId for correlation.
 * Loop events additionally carry iterationIndex and ideaId.
 */
export interface StageEvent {
  /** Correlation ID for the current pipeline run. */
  pipelineRunId: string;

  /** Current loop iteration index (present only during LoopStage execution). */
  iterationIndex?: number;

  /** ID of the idea currently being processed (present only during loop). */
  ideaId?: string;

  /** Name of the stage that emitted this event. */
  stageName: string;

  /** PWT role of the stage: provider, worker, transformer, cleaner, or composite. */
  role: string;

  /** Execution duration in milliseconds (present on completion events). */
  durationMs?: number;

  /** Error that caused stage failure (present on failure events). */
  error?: Error;
}
