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