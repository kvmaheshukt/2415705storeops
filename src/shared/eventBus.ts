type Event = { type: string; payload: any; timestamp: string };

const subscribers: { [type: string]: ((event: Event) => void)[] } = {};

export const eventBus = {
  publish(event: Event) {
    (subscribers[event.type] || []).forEach(fn => fn(event));
  },
  subscribe(type: string, handler: (event: Event) => void) {
    if (!subscribers[type]) subscribers[type] = [];
    subscribers[type].push(handler);
  }
};
