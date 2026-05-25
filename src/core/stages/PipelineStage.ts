import { produce, Draft } from 'immer';
import { PipelineContext } from '../pipeline/PipelineContext';
import { EventBus } from '../events/EventBus';
import { StageEvent } from '../events/StageEvent';
import { StageResult } from '../models/PipelineResult';

/**
 * PWT role type for stage classification.
 */
export type StageRole = 'provider' | 'worker' | 'transformer' | 'cleaner' | 'composite';

/**
 * Abstract base class for all pipeline stages.
 *
 * Implements the Template Method pattern: the `run()` method defines the
 * invariant execution skeleton, while subclasses implement the four
 * abstract hooks to provide stage-specific logic.
 *
 * Skeleton: emit started → validate → extract → process → apply (via Immer) → emit completed
 * On error: emit failed → throw
 *
 * All context mutations are enforced through Immer's `produce()` — no stage
 * ever manually spreads or mutates context.
 */
export abstract class PipelineStage {
  abstract readonly name: string;
  abstract readonly role: StageRole;

  constructor(protected eventBus: EventBus) {}

  /**
   * Template method — executes the full stage lifecycle.
   * Subclasses MUST NOT override this method (except LoopStage/CompositeStage).
   */
  async run(context: PipelineContext): Promise<PipelineContext> {
    const startTime = Date.now();
    this.eventBus.emit('stage:started', this.buildEvent(context));

    try {
      this.validate(context);
      const input = this.extractInput(context);
      const output = await this.process(input);

      const newContext = produce(context, (draft: Draft<PipelineContext>) => {
        this.applyOutput(draft, output);
        (draft.stageHistory as StageResult[]).push({
          stageName: this.name,
          role: this.role,
          status: 'success',
          durationMs: Date.now() - startTime,
        });
      });

      this.eventBus.emit('stage:completed', this.buildEvent(newContext, Date.now() - startTime));
      return newContext;
    } catch (error) {
      this.eventBus.emit('stage:failed', this.buildEvent(context, undefined, error as Error));
      throw error;
    }
  }

  /**
   * Validates preconditions on the context before processing.
   * Throw if validation fails.
   */
  protected abstract validate(context: PipelineContext): void;

  /**
   * Extracts the relevant input from the pipeline context.
   */
  protected abstract extractInput(context: PipelineContext): any;

  /**
   * Performs the stage's core work (AI call, I/O, data shaping, etc.).
   */
  protected abstract process(input: any): Promise<any>;

  /**
   * Applies the processing output to the context draft (Immer mutable draft).
   */
  protected abstract applyOutput(draft: Draft<PipelineContext>, output: any): void;

  /**
   * Builds a StageEvent for observability.
   */
  protected buildEvent(context: PipelineContext, durationMs?: number, error?: Error): StageEvent {
    return {
      pipelineRunId: context.pipelineRunId,
      iterationIndex: context.currentIdeaObject
        ? context.ideasToWrite.findIndex(i => i.id === context.currentIdeaObject!.id)
        : undefined,
      ideaId: context.currentIdeaObject?.id,
      stageName: this.name,
      role: this.role,
      durationMs,
      error,
    };
  }
}
