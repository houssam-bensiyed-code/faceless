import { EventBus } from '../../../src/core/events/EventBus';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('on() and emit()', () => {
    it('should invoke a registered handler when the event is emitted', () => {
      const handler = jest.fn();
      eventBus.on('test:event', handler);

      eventBus.emit('test:event', { data: 'hello' });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ data: 'hello' });
    });

    it('should invoke multiple handlers registered for the same event', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      eventBus.on('test:event', handler1);
      eventBus.on('test:event', handler2);

      eventBus.emit('test:event', { value: 42 });

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler1).toHaveBeenCalledWith({ value: 42 });
      expect(handler2).toHaveBeenCalledWith({ value: 42 });
    });

    it('should pass undefined payload when emit is called without one', () => {
      const handler = jest.fn();
      eventBus.on('test:event', handler);

      eventBus.emit('test:event');

      expect(handler).toHaveBeenCalledWith(undefined);
    });

    it('should not invoke handlers registered for different events', () => {
      const handler = jest.fn();
      eventBus.on('event:a', handler);

      eventBus.emit('event:b', { data: 'wrong' });

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('off()', () => {
    it('should remove a registered handler so it is no longer invoked', () => {
      const handler = jest.fn();
      eventBus.on('test:event', handler);
      eventBus.off('test:event', handler);

      eventBus.emit('test:event', { data: 'removed' });

      expect(handler).not.toHaveBeenCalled();
    });

    it('should not affect other handlers when one is removed', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      eventBus.on('test:event', handler1);
      eventBus.on('test:event', handler2);
      eventBus.off('test:event', handler1);

      eventBus.emit('test:event', 'payload');

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledWith('payload');
    });

    it('should be a no-op when removing a handler that was never registered', () => {
      const handler = jest.fn();

      // Should not throw
      expect(() => eventBus.off('test:event', handler)).not.toThrow();
    });
  });

  describe('unknown events', () => {
    it('should not throw when emitting an event with no registered listeners', () => {
      expect(() => eventBus.emit('unknown:event', { data: 'test' })).not.toThrow();
    });

    it('should not throw when removing a handler for an event that has no listeners', () => {
      expect(() => eventBus.off('nonexistent', jest.fn())).not.toThrow();
    });
  });
});
