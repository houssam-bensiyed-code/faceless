/**
 * Simple structured logger with timestamp and level prefixes.
 *
 * Outputs to stdout/stderr via console methods. In production,
 * this can be swapped for a more sophisticated logging library
 * without changing call sites.
 */
export const logger = {
  info(message: string, ...args: unknown[]): void {
    console.log(`[${new Date().toISOString()}] [INFO] ${message}`, ...args);
  },

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[${new Date().toISOString()}] [WARN] ${message}`, ...args);
  },

  error(message: string, ...args: unknown[]): void {
    console.error(`[${new Date().toISOString()}] [ERROR] ${message}`, ...args);
  },
};
