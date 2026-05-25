import { PipelineStage } from './PipelineStage';
import { IFileStoragePort } from '../ports/IFileStoragePort';
import { EventBus } from '../events/EventBus';

/**
 * Base class for Cleaner stages.
 *
 * Cleaners handle file and memory management — file uploads, temp folder
 * cleanup, staging management, and file promotion. No business logic, no AI.
 *
 * Constructor enforces PWT boundary: Cleaners receive ONLY IFileStoragePort.
 * They must never access IAIProviderPort or IDataStorePort.
 */
export abstract class CleanerStage extends PipelineStage {
  readonly role = 'cleaner' as const;

  constructor(
    protected fileStorage: IFileStoragePort,
    eventBus: EventBus,
  ) {
    super(eventBus);
  }
}
