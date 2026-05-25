import { PipelineStage } from './PipelineStage';
import { IAIProviderPort } from '../ports/IAIProviderPort';
import { EventBus } from '../events/EventBus';

/**
 * Base class for Worker stages.
 *
 * Workers handle compute and generation — they are the ONLY components
 * that run AI. Each Worker performs exactly one AI job.
 *
 * Constructor enforces PWT boundary: Workers receive ONLY IAIProviderPort.
 * They must never access IDataStorePort or IFileStoragePort.
 */
export abstract class WorkerStage extends PipelineStage {
  readonly role = 'worker' as const;

  constructor(
    protected aiProvider: IAIProviderPort,
    eventBus: EventBus,
  ) {
    super(eventBus);
  }
}
