/**
 * Thrown when the circuit breaker is in the OPEN state and refuses
 * to forward requests to the AI provider. Implements fail-fast behavior
 * to prevent cascading failures.
 */
export class CircuitOpenError extends Error {
  constructor(message = 'Circuit breaker is OPEN. Requests are being rejected to prevent cascading failures.') {
    super(message);
    this.name = 'CircuitOpenError';
  }
}
