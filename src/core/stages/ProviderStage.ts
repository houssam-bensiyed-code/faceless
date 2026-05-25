import { PipelineStage } from './PipelineStage';
import { IDataStorePort } from '../ports/IDataStorePort';
import { EventBus } from '../events/EventBus';

/**
 * Base class for Provider stages.
 *
 * Providers handle I/O and state — reading from and writing to external
 * data sources. They update state only if the job succeeds.
 *
 * Constructor enforces PWT boundary: Providers receive ONLY IDataStorePort.
 * They must never access IAIProviderPort or IFileStoragePort.
 */
export abstract class ProviderStage extends PipelineStage {
  readonly role = 'provider' as const;

  constructor(
    protected dataStore: IDataStorePort,
    eventBus: EventBus,
  ) {
    super(eventBus);
  }
}
