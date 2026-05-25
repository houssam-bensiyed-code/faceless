/**
 * Creates a deep clone of the given value using the native structuredClone API.
 *
 * Used to create working copies of data (e.g., deep-cloning ideas arrays
 * in Provider and Transformer stages) to prevent unintended mutations
 * of source data.
 *
 * @param value - The value to deep clone.
 * @returns A structurally identical but fully independent copy.
 */
export function deepClone<T>(value: T): T {
  return structuredClone(value);
}
