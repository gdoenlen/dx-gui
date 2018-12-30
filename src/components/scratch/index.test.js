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

describe('open', () => {
  it('should call sfdx open org and return true on success', () => {
    const username = 'username';
    return cmp.instance().open(username)
      .then(data => {
        expect(data).toEqual(true);
        expect(sfdx.openOrg.mock.calls.length).toEqual(1);
        expect(sfdx.openOrg.mock.calls[0][0]).toBe(username);
      });
  });

  it('should publish any error caught and return false', () => {
    const err = new Error('test');
    sfdx.openOrg.mockImplementation(() => {
      throw err;
    });

    // clear the calls from mounting etc
    pubsub.publish.mockReset();

    return cmp.instance().open()
      .then(data => {
        expect(data).toEqual(false);
        expect(pubsub.publish.mock.calls.length).toBe(1);
        expect(pubsub.publish.mock.calls[0][0]).toBe('error');
        expect(pubsub.publish.mock.calls[0][1]).toBe(err);
      });
  });
});

describe('delete', () => {
  it('should sfdx.delete(username), remove the scratchOrg from the state, and return true', () => {
    const username = 'username';
    const result = {
      result: {
        orgId: '1'
      }
    };
    cmp.setState({
      orgs: {
        scratchOrgs: [{
          orgId: '1'
        }]
      }
    });
    sfdx.delete.mockImplementation(() => result);
    return cmp.instance().delete(username)
      .then(data => {
        expect(data).toEqual(true);
        expect(sfdx.delete.mock.calls.length).toEqual(1);
        expect(sfdx.delete.mock.calls[0][0]).toBe(username);
        expect(cmp.state().orgs.scratchOrgs).toEqual([]);
      });
  });

  it('should publish any error caught and return false', () => {
    const err = new Error('test');
    sfdx.delete.mockImplementation(() => {
      throw err;
    });

    pubsub.publish.mockReset();
    return cmp.instance().delete()
      .then(data => {
        expect(data).toEqual(false);
        expect(pubsub.publish.mock.calls.length).toEqual(1);
        expect(pubsub.publish.mock.calls[0][0]).toEqual('error');
        expect(pubsub.publish.mock.calls[0][1]).toBe(err);
      });
  });
});

describe('saveOrg', () => {
  it('should call newScratch, then refresh the orgs, and return true', () => {
    pubsub.publish.mockReset();
    cmp.instance().getOrgs = jest.fn();

    const res = {
      nonScratchOrgs: [{
        id: '1'
      }],
      scratchOrgs: [{
        id: '1'
      }]
    };
    cmp.instance().getOrgs.mockImplementation(() => res);

    const form = {
      auth: 'username',
      alias: undefined,
      file: '/some/path/to.json'
    };
    return cmp.instance().saveOrg(form)
      .then(data => {
        expect(data).toEqual(true);
        expect(sfdx.newScratch.mock.calls.length).toEqual(1);
        expect(sfdx.newScratch.mock.calls[0][0]).toBe(form.auth);
        expect(sfdx.newScratch.mock.calls[0][1]).toBe(form.file);
        expect(sfdx.newScratch.mock.calls[0][2]).toBe(form.alias);
        expect(cmp.state().orgs).toBe(res);
      });
  });

  it('should publish any error caught and return false', () => {
    pubsub.publish.mockReset();
    const err = new Error('test');
    sfdx.newScratch.mockImplementation(() => {
      throw err;
    });

    return cmp.instance().saveOrg({})
      .then(data => {
        expect(data).toEqual(false);
        expect(pubsub.publish.mock.calls[1][0]).toEqual('error');
        expect(pubsub.publish.mock.calls[1][1]).toBe(err);
      });
  });
});

describe('openModal', () => {
  it('should set state[modal][title] to title', () => {
    cmp.instance().openModal(undefined, 'title', undefined);
    expect(cmp.state().modal.title).toEqual('title');
  });

  it('should set state[modal][form] to formName', () => {
    cmp.instance().openModal(undefined, undefined, 'formName');
    expect(cmp.state().modal.form).toEqual('formName');
  });
});