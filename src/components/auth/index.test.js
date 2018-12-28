import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from './index';
import sfdx from '../../services/sfdx';
import pubsub from '../../services/pubsub';

let cmp;
jest.mock('../../services/sfdx');
jest.mock('../../services/pubsub');

function resetMocks(mock) {
  for (const prop in mock) {
    if (prop && prop._isMockFunction) {
      prop.mockReset();
    }
  }
}

beforeEach(() => {
  resetMocks(sfdx);
  resetMocks(pubsub);
  cmp = shallow(<Auth />);
});

describe('componentDidMount', () => {
  it('should getOrgs', () => {
    expect(sfdx.getOrgs.mock.calls.length).toBe(1);
  });

  it('should publish any err caught', () => {
    sfdx.getOrgs.mockImplementation(() => {
      throw new Error();
    });

    return cmp.instance().getOrgs()
      .catch(() => {
        expect(pubsub.publish.mock.calls[1][0]).toBe('error');
      });
  });
});

describe('getOrgs', () => {
  it('should set the state[auths] with getOrgs.result.nonScratchOrgs', () => {
    const result = {
      result: {
        nonScratchOrgs: [{
          id: 1
        }, {
          id: 2
        }]
      }
    };

    sfdx.getOrgs.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(result);
      });
    });

    return cmp.instance().getOrgs()
      .then(() => expect(cmp.state().auths).toBe(result.result.nonScratchOrgs));
  });

  it('should add an id property with the index of the nonScratchOrg to each item', () => {
    const result = {
      result: {
        nonScratchOrgs: [{

        }, {

        }]
      }
    };
    
    sfdx.getOrgs.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(result);
      });
    });

    return cmp.instance().getOrgs()
      .then(() => cmp.state().auths.forEach((auth, i) => expect(auth.id).toBe(i.toString())));
  });
});

describe('saveAuth', () => {
  it('should call sfdx.newAuth(alias)', () => {
    sfdx.newAuth.mockImplementation(() => {
      return new Promise(resolve => resolve());
    });

    const alias = 'alias';
    return cmp.instance().saveAuth(alias)
      .then(() => expect(sfdx.newAuth.mock.calls[0][0]).toBe(alias));
  });

  it('should publish an err on any error caught', () => {
    sfdx.newAuth.mockImplementation(() => {
      throw new Error();
    });

    return cmp.instance().saveAuth()
      .then(() => false)
      .catch(() => true);
  });
});

describe('handleRowAction', () => {
  it('should call cmp.delete(item.username) when action.value is delete', () => {
    cmp.instance().delete = jest.fn();
    cmp.instance().delete.mockImplementation(() => new Promise(resolve => {
      resolve();
    }));

    const item = { username: 'test' };
    const action = { value: 'delete' };
    return cmp.instance().handleRowAction(item, action)
      .then(() => {
        expect(cmp.instance().delete.mock.calls.length).toBe(1);
        expect(cmp.instance().delete.mock.calls[0][0]).toBe(item.username);
      });
  });

  it('should throw an error when the default case is reached', () => {
    return cmp.instance().handleRowAction(undefined, { value: 'test' })
      .then(() => expect(false).toBe(true))
      .catch(e => expect(e).toEqual(new Error('No case for this action')));
  });
});

describe('delete', () => {
  it('should call sfdx.logout(username) and remove the username from state[auths]', () => {
    const username = 'username';
    const result = {
      result: [
        username
      ]
    };
    sfdx.logout.mockImplementation(username => new Promise(resolve => resolve(result)));

    return cmp.instance().delete(username)
      .then(() => {
        expect(sfdx.logout.mock.calls.length).toBe(1);
        expect(sfdx.logout.mock.calls[0][0]).toBe(username);
        cmp.state().auths.forEach(auth => expect(auth.username).not.toBe(username));
      });
  });

  it('should publish an error on any error caught', () => {
    const err = new Error('test');
    sfdx.logout.mockImplementation(() => {
      throw err;
    });

    return cmp.instance().delete()
      .catch(e => expect(e).toBe(err));
  });
});