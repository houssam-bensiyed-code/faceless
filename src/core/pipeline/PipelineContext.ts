import { IdeaObject } from '../models/IdeaObject';
import { PipelineStatus } from '../models/PipelineStatus';
import { StageResult } from '../models/PipelineResult';

/**
 * Immutable pipeline context — the single data structure passed through
 * every stage in the pipeline chain.
 *
 * All mutations MUST go through Immer's `produce()` as enforced by
 * the PipelineStage base class. No stage ever manually spreads or
 * mutates context.
 */
export interface PipelineContext {
  // --- Main pipeline data ---
  readonly externalIdeasArray:     IdeaObject[];
  readonly tempLocalIdeas:         IdeaObject[];
  readonly rawIdeasText:           string;
  readonly internalIdeasArray:     IdeaObject[];

  // --- Sub-pipeline data ---
  readonly ideasToWrite:           IdeaObject[];
  readonly currentIdeaObject:      IdeaObject | null;
  readonly currentScriptText:      string;
  readonly currentRawRankResponse: string;
  readonly currentScore:           number;
  readonly pattern:                string;

  // --- Integrity ---
  readonly batchId:                string;

  // --- Observability ---
  readonly pipelineRunId:          string;
  readonly pipelineStatus:         PipelineStatus;
  readonly errors:                 ReadonlyArray<Error>;
  readonly stageHistory:           ReadonlyArray<StageResult>;
}

/**
 * Factory and utility namespace for PipelineContext.
 */
export namespace PipelineContext {
  /**
   * Creates a fresh initial context for a new pipeline run.
   * All collections are empty, all scalars are at their zero values.
   */
  export function createInitial(runId: string): PipelineContext {
    return {
      externalIdeasArray:     [],
      tempLocalIdeas:         [],
      rawIdeasText:           '',
      internalIdeasArray:     [],

      ideasToWrite:           [],
      currentIdeaObject:      null,
      currentScriptText:      '',
      currentRawRankResponse: '',
      currentScore:           0,
      pattern:                '',

      batchId:                '',

      pipelineRunId:          runId,
      pipelineStatus:         PipelineStatus.IDLE,
      errors:                 [],
      stageHistory:           [],
    };
  }
}
