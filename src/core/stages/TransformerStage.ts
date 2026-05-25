import { PipelineStage } from './PipelineStage';
import { EventBus } from '../events/EventBus';

/**
 * Base class for pure Transformer stages.
 *
 * Transformers handle data shaping and parsing — they change the SHAPE
 * of data, not the core content. They have ZERO external dependencies,
 * which is the proof that the hexagonal boundary is correct.
 *
 * Constructor enforces PWT boundary: Transformers receive ONLY EventBus.
 * No ports — no AI, no I/O, no file access.
 */
export abstract class TransformerStage extends PipelineStage {
  readonly role = 'transformer' as const;

  constructor(eventBus: EventBus) {
    super(eventBus);
  }
}
