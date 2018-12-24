import { PubSub } from './pubsub';

let pubsub;

beforeEach(() => {
  pubsub = new PubSub();
});

describe('subscribe', () => {
  it('should create a new array if the event does not exist', () => {
    const newEvent = 'newEvent';
    pubsub.subscribe(newEvent, () => { });
    expect(pubsub.events[newEvent]).not.toBe(undefined);
  });

  it('should add the function to the event array', () => {
    const newEvent = 'newEvent';
    pubsub.subscribe(newEvent, () => { });
    expect(pubsub.events[newEvent].length).toBe(1);
  });
});

describe('publish', () => {
  it('should fire all functions with the data supplied', () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    pubsub.subscribe('event', mockFn);
    pubsub.subscribe('event', mockFn2);
    
    const data = { status: 1 };
    pubsub.publish('event', data);

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe(data);
    expect(mockFn2.mock.calls.length).toBe(1);
    expect(mockFn2.mock.calls[0][0]).toBe(data);
  });
});