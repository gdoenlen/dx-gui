import React from 'react';
import { shallow } from 'enzyme';
import { Scratch } from './index';
import sfdx from '../../services/sfdx';
import pubsub from '../../services/pubsub';

let cmp;
jest.mock('../../services/sfdx');
jest.mock('../../services/pubsub');

function resetMocks(mock) {
  for (const prop in mock) {
    if (mock[prop] && mock[prop]._isMockFunction) {
      mock[prop].mockReset();
    }
  }
}

beforeEach(() => {
  resetMocks(sfdx);
  resetMocks(pubsub); 
  cmp = shallow(<Scratch />);
});

describe('getOrgs', () => {
  it('should return the result prop of whatever sfdx returns', () => {
    const result = {
      result: {
        nonScratchOrgs: [],
        scratchOrgs: []
      }
    };
    sfdx.getOrgs.mockImplementation(() => {
      return new Promise(resolve => resolve(result));
    });

    return expect(cmp.instance().getOrgs()).resolves.toBe(result.result);
  });

  it('should add the index as the id on scratch orgs and the username as a key property', () => {
    const result = {
      result: {
        scratchOrgs: [{
          username: 'test'
        }, {
          username: 'test2'
        }]
      }
    };
    sfdx.getOrgs.mockImplementation(() => new Promise(resolve => resolve(result)));
    const expected = Object.assign({}, result.result);
    expected.scratchOrgs.forEach((scratch, i) => {
      scratch.id = i.toString();
      scratch.key = scratch.username
    });

    return expect(cmp.instance().getOrgs()).resolves.toEqual(expected);
  });
});

describe('handleRowAction', () => {
  it('should call open(item.username) when action.value is open', () => {
    cmp.instance().open = jest.fn();
    const item = { username: 'test' };
    const action = { value: 'open' };
    cmp.instance().handleRowAction(item, action);
    expect(cmp.instance().open.mock.calls.length).toBe(1);
    expect(cmp.instance().open.mock.calls[0][0]).toBe(item.username);  
  });

  it('should call delete(item.username) when action.value is delete', () => {
    cmp.instance().delete = jest.fn();
    const item = { username: 'test' };
    const action = { value: 'delete' };
    cmp.instance().handleRowAction(item, action);
    expect(cmp.instance().delete.mock.calls.length).toBe(1);
    expect(cmp.instance().delete.mock.calls[0][0]).toBe(item.username);
  });

  it('should call openModal when action.value is push', () => {
    cmp.instance().openModal = jest.fn();
    const item = { username: 'test' };
    const action = { value: 'push' };
    cmp.instance().handleRowAction(item, action);
    expect(cmp.instance().openModal.mock.calls.length).toBe(1);
  });

  it('should call openModal when action.value is pull', () => {
    cmp.instance().openModal = jest.fn();
    const item = { username: 'test' };
    const action = { value: 'pull' };
    cmp.instance().handleRowAction(item, action);
    expect(cmp.instance().openModal.mock.calls.length).toBe(1);
  });
});