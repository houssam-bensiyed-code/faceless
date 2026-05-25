/**
 * Callback type for event handlers.
 */
export type EventHandler = (payload?: any) => void;

/**
 * Observer pattern implementation for pipeline event communication.
 *
 * All stage lifecycle events (started, completed, failed) and loop iteration
 * events flow through the EventBus. Listeners register for specific event
 * names and receive the associated payload.
 *
 * Events carry pipelineRunId for correlation across the full execution trace.
 */
export class EventBus {
  private listeners = new Map<string, EventHandler[]>();

  /**
   * Registers a handler for the given event name.
   */
  on(event: string, handler: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
  }

  /**
   * Removes a previously registered handler for the given event name.
   * If the handler is not found, this is a no-op.
   */
  off(event: string, handler: EventHandler): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Emits an event, invoking all registered handlers with the given payload.
   * If no handlers are registered for the event, this is a no-op.
   */
  emit(event: string, payload?: any): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler(payload);
      }
    }
  }
}
