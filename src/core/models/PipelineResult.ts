import { PipelineStatus } from './PipelineStatus';

/**
 * Records the outcome of a single pipeline stage execution.
 */
export interface StageResult {
  stageName:  string;
  role:       'provider' | 'worker' | 'transformer' | 'cleaner' | 'composite';
  status:     'success' | 'failure';
  durationMs: number;
  error?:     string;
}

/**
 * Snapshot of pipeline context fields needed by PipelineResult factory methods.
 * Avoids circular dependency with PipelineContext.
 */
interface PipelineContextSnapshot {
  pipelineRunId:      string;
  internalIdeasArray: readonly { length: number }[] | { length: number };
  stageHistory:       readonly StageResult[];
  errors:             readonly Error[];
}

/**
 * Immutable record of a completed (or failed) pipeline run.
 * Created via static factory methods — never constructed directly.
 */
export class PipelineResult {
  readonly pipelineRunId:   string;
  readonly status:          PipelineStatus;
  readonly ideasProcessed:  number;
  readonly stageHistory:    StageResult[];
  readonly errors:          string[];
  readonly startedAt:       string;
  readonly completedAt:     string;
  readonly totalDurationMs: number;

  private constructor(
    pipelineRunId:  string,
    status:         PipelineStatus,
    ideasProcessed: number,
    stageHistory:   StageResult[],
    errors:         string[],
    startedAt:      string,
    completedAt:    string,
    totalDurationMs: number,
  ) {
    this.pipelineRunId  = pipelineRunId;
    this.status         = status;
    this.ideasProcessed = ideasProcessed;
    this.stageHistory   = stageHistory;
    this.errors         = errors;
    this.startedAt      = startedAt;
    this.completedAt    = completedAt;
    this.totalDurationMs = totalDurationMs;
  }

  /**
   * Creates a PipelineResult representing a successful pipeline run.
   */
  static success(context: PipelineContextSnapshot, startedAt: string): PipelineResult {
    const completedAt = new Date().toISOString();
    return new PipelineResult(
      context.pipelineRunId,
      PipelineStatus.COMPLETED,
      Array.isArray(context.internalIdeasArray) ? context.internalIdeasArray.length : 0,
      [...context.stageHistory],
      [],
      startedAt,
      completedAt,
      Date.now() - new Date(startedAt).getTime(),
    );
  }

  /**
   * Creates a PipelineResult representing a failed pipeline run.
   */
  static failure(error: Error, context: PipelineContextSnapshot, startedAt: string): PipelineResult {
    const completedAt = new Date().toISOString();
    return new PipelineResult(
      context.pipelineRunId,
      PipelineStatus.FAILED,
      Array.isArray(context.internalIdeasArray) ? context.internalIdeasArray.length : 0,
      [...context.stageHistory],
      [...context.errors.map(e => e.message), error.message],
      startedAt,
      completedAt,
      Date.now() - new Date(startedAt).getTime(),
    );
  }
}
