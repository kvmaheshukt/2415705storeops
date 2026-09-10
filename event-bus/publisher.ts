export interface DomainEvent {
  type: string;
  payload: any;
}

export class EventBus {
  private subscribers: { [key: string]: Function[] } = {};

  publish(event: DomainEvent) {
    if (this.subscribers[event.type]) {
      this.subscribers[event.type].forEach(fn => fn(event.payload));
    }
  }

  subscribe(eventType: string, handler: Function) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(handler);
  }
}
