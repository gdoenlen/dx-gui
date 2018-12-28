import React from 'react';
import GlobalErrModal from './globalerrmodal';
import { shallow } from 'enzyme';
import pubsub from '../services/pubsub';

jest.mock('../services/pubsub');
let cmp;

beforeEach(() => {
  cmp = shallow(<GlobalErrModal />);
});

describe('constructor', () => {
  it('should subscribe to error pubsub events', () => {
    expect(pubsub.subscribe.mock.calls.length).toBe(1);
    expect(pubsub.subscribe.mock.calls[0][0]).toBe('error');
  });
});