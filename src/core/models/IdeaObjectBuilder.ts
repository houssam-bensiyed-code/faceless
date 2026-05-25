import { IdeaObject } from './IdeaObject';

/**
 * Builder pattern for constructing IdeaObject instances incrementally.
 *
 * Usage:
 *   const idea = new IdeaObjectBuilder()
 *     .setId('idea-1')
 *     .setTitle('My Idea')
 *     .setStatus('new')
 *     .setBatchId('batch-001')
 *     .build();
 *
 * Or from an existing idea:
 *   const modified = IdeaObjectBuilder.from(existingIdea)
 *     .setScore(85)
 *     .build();
 */
export class IdeaObjectBuilder {
  private idea: Partial<IdeaObject> = {};

  setId(id: string): this {
    this.idea.id = id;
    return this;
  }

  setTitle(title: string): this {
    this.idea.title = title;
    return this;
  }

  setStatus(status: string): this {
    this.idea.status = status;
    return this;
  }

  setBatchId(batchId: string): this {
    this.idea.batchId = batchId;
    return this;
  }

  setIdeaContent(ideaContent: string): this {
    this.idea.ideaContent = ideaContent;
    return this;
  }

  setScript(script: string): this {
    this.idea.script = script;
    return this;
  }

  setScore(score: number): this {
    this.idea.score = score;
    return this;
  }

  /**
   * Validates required fields and returns a frozen IdeaObject.
   * @throws Error if any required field (id, title, status, batchId) is missing.
   */
  build(): IdeaObject {
    const { id, title, status, batchId } = this.idea;

    if (!id || !title || !status || !batchId) {
      const missing: string[] = [];
      if (!id) missing.push('id');
      if (!title) missing.push('title');
      if (!status) missing.push('status');
      if (!batchId) missing.push('batchId');
      throw new Error(`IdeaObject requires: ${missing.join(', ')}`);
    }

    return { ...this.idea } as IdeaObject;
  }

  /**
   * Creates a new builder pre-populated from an existing IdeaObject.
   * Useful for creating modified copies without mutating the original.
   */
  static from(idea: IdeaObject): IdeaObjectBuilder {
    const builder = new IdeaObjectBuilder();
    builder.idea = { ...idea };
    return builder;
  }
}
