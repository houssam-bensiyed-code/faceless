/**
 * Core domain entity representing a content idea at any stage of the pipeline.
 *
 * Fields are progressively populated as the idea moves through pipeline stages:
 *   - Provider (Reader):  id, title, status, batchId
 *   - Transformer (Organizer): ideaContent
 *   - Scripts Processor sub-pipeline: script, score
 *
 * The `script` field stores a folder-agnostic filename (NOT a path or URL).
 * Resolution to a physical location is deferred to read time via ScriptResolver.
 */
export interface IdeaObject {
  /** Unique identifier for this idea. */
  id: string;

  /** Idea title or summary. */
  title: string;

  /** Current processing status. */
  status: string;

  /** Batch identifier used for corruption detection. */
  batchId: string;

  /** Detailed idea description/content. Appended by IdeasOrganizerTransformer. */
  ideaContent?: string;

  /**
   * Script file ID — folder-agnostic filename, NOT a path.
   * Example: "script_1716400000000_a3f2.txt"
   * Appended by FileSaverCleaner.
   */
  script?: string;

  /** AI-generated quality score. Appended by ScoreAppenderTransformer. */
  score?: number;
}
