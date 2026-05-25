/**
 * Thrown when a script file cannot be found in either the prod or dev
 * storage folders during resolution.
 */
export class ScriptNotFoundError extends Error {
  constructor(scriptId: string) {
    super(`Script not found: "${scriptId}" was not found in prod or dev storage folders.`);
    this.name = 'ScriptNotFoundError';
  }
}
