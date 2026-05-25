import { IdeaObject } from '../models/IdeaObject';

/**
 * Port interface for persistent data store operations.
 * Consumed by: Provider stages (IdeasReader, IdeasSaver).
 * Production adapter: GoogleSheetsAdapter.
 * Test adapter: StubDataStore.
 */
export interface IDataStorePort {
  /**
   * Retrieves all idea objects from the data store.
   */
  getAll(): Promise<IdeaObject[]>;

  /**
   * Persists the full ideas array to the data store (replaces existing data).
   * @param ideas - The complete array of ideas to persist.
   */
  saveAll(ideas: IdeaObject[]): Promise<void>;

  /**
   * Ensures the data store (sheet/table) exists, creating it if necessary.
   */
  ensureExists(): Promise<void>;

  /**
   * Returns the batch ID from the last successful save, or null if none exists.
   */
  getLastBatchId(): Promise<string | null>;
}
