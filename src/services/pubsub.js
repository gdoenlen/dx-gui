/**
 * A simple pubsub organizer
 */
export class PubSub {
  
  /**
   * Constructor that allows for preconfiguring events
   * @constructor
   * @param {object} events - preconfigured events 
   */
  constructor(events) {
    this.events = events || {};
  }

  /**
   * 
   * @param {string} event - the name of the event were subscribing to 
   * @param {function} fn - callback function to be executed when this event fires 
   */
  subscribe(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(fn);
  }

  /**
   * 
   * @param {string} event - the name of the event were publishing 
   * @param {any} data - the data to be passed to the callback function
   */
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }
}

const pubsub = new PubSub();
export default pubsub;
