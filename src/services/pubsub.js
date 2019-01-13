/*
 *  DXGUI - GUI Client for the sfdx cli
 *  Copyright (C) 2019 George Doenlen
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
