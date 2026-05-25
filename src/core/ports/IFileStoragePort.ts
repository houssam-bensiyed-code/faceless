/**
 * Port interface for file storage operations.
 * Consumed by: Cleaner stages (PreLoopCleaner, FileSaverCleaner, FilePromoterCleaner).
 * Production adapter: GoogleDriveAdapter.
 * Dev testing adapter: LocalFSAdapter.
 * Unit test adapter: StubFileStorage.
 */
export interface IFileStoragePort {
  /**
   * Writes content to a file within the specified folder.
   * @param folder - The folder name (e.g., 'dev' or 'prod').
   * @param filename - The file name to write.
   * @param content - The text content to write.
   */
  writeFile(folder: string, filename: string, content: string): Promise<void>;

  /**
   * Reads the content of a file from the specified folder.
   * @param folder - The folder name.
   * @param filename - The file name to read.
   * @returns The text content of the file.
   */
  readFile(folder: string, filename: string): Promise<string>;

  /**
   * Deletes an entire folder and all its contents.
   * @param folder - The folder name to delete.
   */
  deleteFolder(folder: string): Promise<void>;

  /**
   * Moves all files from one folder to another.
   * @param source - The source folder name.
   * @param destination - The destination folder name.
   */
  moveFolder(source: string, destination: string): Promise<void>;

  /**
   * Lists all file names within a folder.
   * @param folder - The folder name to list.
   * @returns Array of filenames in the folder.
   */
  listFiles(folder: string): Promise<string[]>;

  /**
   * Checks whether a folder exists.
   * @param folder - The folder name to check.
   * @returns True if the folder exists.
   */
  folderExists(folder: string): Promise<boolean>;
}
