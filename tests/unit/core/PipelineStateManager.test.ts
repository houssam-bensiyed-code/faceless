import { PipelineStateManager } from '../../../src/core/pipeline/PipelineStateManager';
import { PipelineStatus } from '../../../src/core/models/PipelineStatus';
import { PipelineResult, StageResult } from '../../../src/core/models/PipelineResult';

describe('PipelineStateManager', () => {
  let stateManager: PipelineStateManager;

  beforeEach(() => {
    stateManager = new PipelineStateManager();
  });

  describe('initial state', () => {
    it('should start with IDLE status', () => {
      expect(stateManager.getStatus()).toBe(PipelineStatus.IDLE);
    });

    it('should not be running initially', () => {
      expect(stateManager.isRunning()).toBe(false);
    });

    it('should have no last result initially', () => {
      expect(stateManager.getLastResult()).toBeNull();
    });

    it('should have empty run history initially', () => {
      expect(stateManager.getRunHistory()).toEqual([]);
    });
  });

  describe('setStatus() and getStatus()', () => {
    it('should update status to RUNNING', () => {
      stateManager.setStatus(PipelineStatus.RUNNING);

      expect(stateManager.getStatus()).toBe(PipelineStatus.RUNNING);
    });

    it('should update status to COMPLETED', () => {
      stateManager.setStatus(PipelineStatus.COMPLETED);

      expect(stateManager.getStatus()).toBe(PipelineStatus.COMPLETED);
    });

    it('should update status to FAILED', () => {
      stateManager.setStatus(PipelineStatus.FAILED);

      expect(stateManager.getStatus()).toBe(PipelineStatus.FAILED);
    });
  });

  describe('isRunning()', () => {
    it('should return true when status is RUNNING', () => {
      stateManager.setStatus(PipelineStatus.RUNNING);

      expect(stateManager.isRunning()).toBe(true);
    });

    it('should return false when status is COMPLETED', () => {
      stateManager.setStatus(PipelineStatus.COMPLETED);

      expect(stateManager.isRunning()).toBe(false);
    });

    it('should return false when status is FAILED', () => {
      stateManager.setStatus(PipelineStatus.FAILED);

      expect(stateManager.isRunning()).toBe(false);
    });

    it('should return false when status is IDLE', () => {
      expect(stateManager.isRunning()).toBe(false);
    });
  });

  describe('recordRun() and getLastResult()', () => {
    it('should record a run and return it as the last result', () => {
      const result = PipelineResult.success(
        {
          pipelineRunId: 'run_1',
          internalIdeasArray: [{ id: '1' }] as any[],
          stageHistory: [] as StageResult[],
          errors: [] as Error[],
        },
        new Date().toISOString(),
      );

      stateManager.recordRun(result);

      const lastResult = stateManager.getLastResult();
      expect(lastResult).toBeDefined();
      expect(lastResult!.pipelineRunId).toBe('run_1');
      expect(lastResult!.status).toBe(PipelineStatus.COMPLETED);
    });

    it('should return the most recent run as last result', () => {
      const result1 = PipelineResult.success(
        { pipelineRunId: 'run_1', internalIdeasArray: [], stageHistory: [], errors: [] },
        new Date().toISOString(),
      );
      const result2 = PipelineResult.success(
        { pipelineRunId: 'run_2', internalIdeasArray: [], stageHistory: [], errors: [] },
        new Date().toISOString(),
      );

      stateManager.recordRun(result1);
      stateManager.recordRun(result2);

      expect(stateManager.getLastResult()!.pipelineRunId).toBe('run_2');
    });
  });

  describe('getRunHistory()', () => {
    it('should return all recorded runs', () => {
      const result1 = PipelineResult.success(
        { pipelineRunId: 'run_1', internalIdeasArray: [], stageHistory: [], errors: [] },
        new Date().toISOString(),
      );
      const result2 = PipelineResult.failure(
        new Error('fail'),
        { pipelineRunId: 'run_2', internalIdeasArray: [], stageHistory: [], errors: [] },
        new Date().toISOString(),
      );

      stateManager.recordRun(result1);
      stateManager.recordRun(result2);

      const history = stateManager.getRunHistory();
      expect(history).toHaveLength(2);
      expect(history[0].pipelineRunId).toBe('run_1');
      expect(history[1].pipelineRunId).toBe('run_2');
    });

    it('should return a copy — mutating the result does not affect internal state', () => {
      const result = PipelineResult.success(
        { pipelineRunId: 'run_1', internalIdeasArray: [], stageHistory: [], errors: [] },
        new Date().toISOString(),
      );

      stateManager.recordRun(result);

      const history1 = stateManager.getRunHistory();
      (history1 as PipelineResult[]).length = 0; // attempt mutation

      const history2 = stateManager.getRunHistory();
      expect(history2).toHaveLength(1);
    });
  });
});
