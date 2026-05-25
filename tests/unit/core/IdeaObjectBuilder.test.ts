import { IdeaObjectBuilder } from '../../../src/core/models/IdeaObjectBuilder';
import { IdeaObject } from '../../../src/core/models/IdeaObject';

describe('IdeaObjectBuilder', () => {
  describe('incremental building', () => {
    it('should build a valid IdeaObject with all required fields', () => {
      const idea = new IdeaObjectBuilder()
        .setId('idea-1')
        .setTitle('Test Idea')
        .setStatus('new')
        .setBatchId('batch-001')
        .build();

      expect(idea.id).toBe('idea-1');
      expect(idea.title).toBe('Test Idea');
      expect(idea.status).toBe('new');
      expect(idea.batchId).toBe('batch-001');
    });

    it('should support setting optional fields', () => {
      const idea = new IdeaObjectBuilder()
        .setId('idea-2')
        .setTitle('Full Idea')
        .setStatus('processed')
        .setBatchId('batch-002')
        .setIdeaContent('Detailed content here')
        .setScript('script_1716400000000_a3f2.txt')
        .setScore(85)
        .build();

      expect(idea.ideaContent).toBe('Detailed content here');
      expect(idea.script).toBe('script_1716400000000_a3f2.txt');
      expect(idea.score).toBe(85);
    });

    it('should support fluent chaining — each setter returns this', () => {
      const builder = new IdeaObjectBuilder();

      // Each call should return the same builder instance
      const result = builder
        .setId('id')
        .setTitle('title')
        .setStatus('status')
        .setBatchId('batch');

      expect(result).toBe(builder);
    });
  });

  describe('build() validation', () => {
    it('should throw when id is missing', () => {
      const builder = new IdeaObjectBuilder()
        .setTitle('Title')
        .setStatus('new')
        .setBatchId('batch-001');

      expect(() => builder.build()).toThrow('id');
    });

    it('should throw when title is missing', () => {
      const builder = new IdeaObjectBuilder()
        .setId('id-1')
        .setStatus('new')
        .setBatchId('batch-001');

      expect(() => builder.build()).toThrow('title');
    });

    it('should throw when status is missing', () => {
      const builder = new IdeaObjectBuilder()
        .setId('id-1')
        .setTitle('Title')
        .setBatchId('batch-001');

      expect(() => builder.build()).toThrow('status');
    });

    it('should throw when batchId is missing', () => {
      const builder = new IdeaObjectBuilder()
        .setId('id-1')
        .setTitle('Title')
        .setStatus('new');

      expect(() => builder.build()).toThrow('batchId');
    });

    it('should list all missing required fields in the error message', () => {
      const builder = new IdeaObjectBuilder();

      expect(() => builder.build()).toThrow('id');
      expect(() => builder.build()).toThrow('title');
      expect(() => builder.build()).toThrow('status');
      expect(() => builder.build()).toThrow('batchId');
    });
  });

  describe('from() static method', () => {
    it('should create a builder pre-populated from an existing IdeaObject', () => {
      const original: IdeaObject = {
        id: 'idea-orig',
        title: 'Original Title',
        status: 'new',
        batchId: 'batch-100',
        ideaContent: 'Some content',
      };

      const copy = IdeaObjectBuilder.from(original).build();

      expect(copy.id).toBe('idea-orig');
      expect(copy.title).toBe('Original Title');
      expect(copy.status).toBe('new');
      expect(copy.batchId).toBe('batch-100');
      expect(copy.ideaContent).toBe('Some content');
    });

    it('should allow modification of the copy without affecting the original', () => {
      const original: IdeaObject = {
        id: 'idea-orig',
        title: 'Original Title',
        status: 'new',
        batchId: 'batch-100',
      };

      const modified = IdeaObjectBuilder.from(original)
        .setTitle('Modified Title')
        .setScore(95)
        .build();

      expect(modified.title).toBe('Modified Title');
      expect(modified.score).toBe(95);
      expect(original.title).toBe('Original Title');
      expect(original.score).toBeUndefined();
    });

    it('should create an independent copy — not a reference', () => {
      const original: IdeaObject = {
        id: 'idea-1',
        title: 'Title',
        status: 'new',
        batchId: 'batch-1',
      };

      const copy = IdeaObjectBuilder.from(original).build();

      expect(copy).toEqual(original);
      expect(copy).not.toBe(original);
    });
  });
});
