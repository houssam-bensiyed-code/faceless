import { PipelineStatus } from '../models/PipelineStatus';
import { PipelineResult } from '../models/PipelineResult';

/**
 * Manages the runtime state of the pipeline.
 *
 * Tracks current status, stores run history, and provides guards
 * against concurrent execution. Designed as a regular class (not a
 * singleton) — instantiated and injected by the composition root.
 */
export class PipelineStateManager {
  private status: PipelineStatus = PipelineStatus.IDLE;
  private runHistory: PipelineResult[] = [];

  /**
   * Returns true if the pipeline is currently executing.
   */
  isRunning(): boolean {
    return this.status === PipelineStatus.RUNNING;
  }

  /**
   * Returns the current pipeline status.
   */
  getStatus(): PipelineStatus {
    return this.status;
  }

  /**
   * Updates the pipeline status.
   */
  setStatus(status: PipelineStatus): void {
    this.status = status;
  }

  /**
   * Records a completed or failed run result in history.
   */
  recordRun(result: PipelineResult): void {
    this.runHistory.push(result);
  }

  /**
   * Returns the most recent run result, or null if no runs have occurred.
   */
  getLastResult(): PipelineResult | null {
    return this.runHistory.length > 0
      ? this.runHistory[this.runHistory.length - 1]
      : null;
  }

  /**
   * Returns a copy of the full run history.
   */
  getRunHistory(): readonly PipelineResult[] {
    return [...this.runHistory];
  }
}
