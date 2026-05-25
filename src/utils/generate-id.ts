/**
 * Generates unique identifiers using timestamp + random hex suffix.
 *
 * Format: `{prefix}_{timestamp}_{randomHex}`
 * Example: "run_1716400000000_a3f2"
 *
 * @param prefix - The identifier prefix (e.g., 'run', 'script', 'batch').
 * @returns A unique string identifier.
 */
export function generateId(prefix = 'id'): string {
  const timestamp = Date.now();
  const suffix = Math.random().toString(16).substring(2, 6);
  return `${prefix}_${timestamp}_${suffix}`;
}
