import { PipelineStage } from './PipelineStage';
import { IAIProviderPort } from '../ports/IAIProviderPort';
import { EventBus } from '../events/EventBus';

/**
 * Base class for AI-powered Transformer stages (justified exception).
 *
 * This exists solely for the ScoreParserTransformer, which needs AI to
 * reliably extract numeric scores from unstructured LLM output. Regex
 * or rule-based parsing would be brittle.
 *
 * This is a documented exception to the PWT rule that Transformers
 * have zero external dependencies.
 *
 * Constructor enforces PWT boundary: receives IAIProviderPort only
 * (never IDataStorePort or IFileStoragePort).
 */
export abstract class AITransformerStage extends PipelineStage {
  readonly role = 'transformer' as const;

  constructor(
    protected aiProvider: IAIProviderPort,
    eventBus: EventBus,
  ) {
    super(eventBus);
  }
}
