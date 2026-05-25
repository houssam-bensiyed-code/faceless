import { PipelineContext } from '../../../src/core/pipeline/PipelineContext';
import { PipelineStatus } from '../../../src/core/models/PipelineStatus';

describe('PipelineContext', () => {
  describe('createInitial()', () => {
    it('should create a context with the provided runId', () => {
      const ctx = PipelineContext.createInitial('run_123');

      expect(ctx.pipelineRunId).toBe('run_123');
    });

    it('should initialize all array fields as empty arrays', () => {
      const ctx = PipelineContext.createInitial('run_test');

      expect(ctx.externalIdeasArray).toEqual([]);
      expect(ctx.tempLocalIdeas).toEqual([]);
      expect(ctx.internalIdeasArray).toEqual([]);
      expect(ctx.ideasToWrite).toEqual([]);
      expect(ctx.errors).toEqual([]);
      expect(ctx.stageHistory).toEqual([]);
    });

    it('should initialize all string fields as empty strings', () => {
      const ctx = PipelineContext.createInitial('run_test');

      expect(ctx.rawIdeasText).toBe('');
      expect(ctx.currentScriptText).toBe('');
      expect(ctx.currentRawRankResponse).toBe('');
      expect(ctx.pattern).toBe('');
      expect(ctx.batchId).toBe('');
    });

    it('should initialize currentScore to 0', () => {
      const ctx = PipelineContext.createInitial('run_test');

      expect(ctx.currentScore).toBe(0);
    });

    it('should initialize currentIdeaObject to null', () => {
      const ctx = PipelineContext.createInitial('run_test');

      expect(ctx.currentIdeaObject).toBeNull();
    });

    it('should initialize pipelineStatus to IDLE', () => {
      const ctx = PipelineContext.createInitial('run_test');

      expect(ctx.pipelineStatus).toBe(PipelineStatus.IDLE);
    });

    it('should have all expected fields present', () => {
      const ctx = PipelineContext.createInitial('run_fields');

      const expectedFields = [
        'externalIdeasArray',
        'tempLocalIdeas',
        'rawIdeasText',
        'internalIdeasArray',
        'ideasToWrite',
        'currentIdeaObject',
        'currentScriptText',
        'currentRawRankResponse',
        'currentScore',
        'pattern',
        'batchId',
        'pipelineRunId',
        'pipelineStatus',
        'errors',
        'stageHistory',
      ];

      for (const field of expectedFields) {
        expect(ctx).toHaveProperty(field);
      }

      // Ensure no unexpected fields
      expect(Object.keys(ctx)).toHaveLength(expectedFields.length);
    });
  });
});
