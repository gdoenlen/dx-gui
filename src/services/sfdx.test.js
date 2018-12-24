import { SfdxService } from './sfdx';

let exec;
let cwd;
let chdir;
let sfdx;

beforeEach(() => {
  exec = jest.fn();
  cwd = jest.fn();
  chdir = jest.fn();
  sfdx = new SfdxService(exec, chdir, cwd);
});

describe('newAuth', () => {
  it('should exec sfdx force:auth:web:login --json when no alias is provided', () => {
    sfdx.newAuth();
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe('sfdx force:auth:web:login --json');
  });

  it('should exec sfdx force:auth:web:login --json --setalias alias when an alias is provided', () => {
    const test = 'Test';
    sfdx.newAuth(test);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:auth:web:login --json --setalias ${test}`);
  });
});

describe('getOrgs', () => {
  it('should exec sfdx force:org:list --json --all', () => {
    sfdx.getOrgs();
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe('sfdx force:org:list --json --all');
  });
});

describe('setAlias', () => {
  it('should exec sfdx force:alias:set alias=username --json', () => {
    const username = 'username';
    const alias = 'alias';
    sfdx.setAlias(username, alias);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:alias:set ${alias}=${username} --json`);
  });
});

describe('logout', () => {
  it('should exec sfdx force:auth:logout -p -u userame --json', () => {
    const username = 'username';
    sfdx.logout(username);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:auth:logout -p -u ${username} --json`);
  });
});

describe('openOrg', () => {
  it('should exec sfdx force:org:open -u username --json', () => {
    const username = 'username';
    sfdx.openOrg(username);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:org:open -u ${username} --json`);
  });
});

describe('delete', () => {
  it('should exec sfdx force:org:delete -u username -p --json', () => {
    const username = 'username';
    sfdx.delete(username);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:org:delete -u ${username} -p --json`);
  });
});

describe('newScratch', () => {
  it('should exec sfdx force:org:create -v username -f scratchDef --json when no alias is provided', () => {
    const username = 'username';
    const scratchDef = 'scratchDef';
    sfdx.newScratch(username, scratchDef);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:org:create -v ${username} -f ${scratchDef} --json`);
  });

  it('should exec sfdx force:org:create -v username -f scratchDef --json -a alias when an alias is provided', () => {
    const username = 'username';
    const scratchDef = 'scratchDef';
    const alias = 'alias';
    sfdx.newScratch(username, scratchDef, alias);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:org:create -v ${username} -f ${scratchDef} --json -a ${alias}`);
  });
});

describe('pushSource', () => {
  it('should call chdir to the given dir', () => {
    const dir = 'dir';
    sfdx.pushSource(undefined, dir);
    expect(chdir.mock.calls.length).toBe(1);
    expect(chdir.mock.calls[0][0]).toBe(dir);
  });

  it('should call cwd to get the cwd', () => {
    sfdx.pushSource();
    expect(cwd.mock.calls.length).toBe(1);
  });

  it('should exec sfdx force:source:push -u username --json', () => {
    const username = 'username';
    sfdx.pushSource(username);
    expect(exec.mock.calls.length).toBe(1);
    expect(exec.mock.calls[0][0]).toBe(`sfdx force:source:push -u ${username} --json`);
  });

  it('should reject if cwd fails', () => {
    cwd.mockImplementation(() => {
      throw new Error();
    });
    return sfdx.pushSource().catch(e => true);
  });

  it('should reject if chdir fails', () => {
    chdir.mockImplementation(() => {
      throw new Error();
    });
    return sfdx.pushSource().catch(e => true);
  });
});

describe('pullSource', () => {
  it('should call chdir to the given dir', () => {
    const dir = 'dir';
    sfdx.pullSource(undefined, dir);
    expect(chdir.mock.calls.length).toBe(1);
    expect(chdir.mock.calls[0][0]).toBe(dir);
  });

  it('should call cwd to get the cwd', () => {
    sfdx.pullSource();
    expect(cwd.mock.calls.length).toBe(1);
  });

  it('should reject if cwd fails', () => {
    cwd.mockImplementation(() => {
      throw new Error()
    });
    return sfdx.pullSource().catch(() => true);
  });

  it('should reject if chdir fails', () => {
    chdir.mockImplementation(() => {
      throw new Error();
    });
    return sfdx.pullSource().catch(() => true);
  });
});

describe('_exec', () => {
  it('should reject if stdout result.status !== 0', () => {
    exec.mockImplementation((cmd, fn) => {
      fn(undefined, JSON.stringify({ status: 1 }), undefined);
    });
    return sfdx._exec().catch(() => true);
  });

  it('should reject if stderr result.status !== 0', () => {
    exec.mockImplementation((cmd, fn) => {
      fn(undefined, undefined, JSON.stringify({ status: 1 }));
    });
    return sfdx._exec().catch(() => true);
  });

  it('should resolve if stdout status === 0', () => {
    exec.mockImplementation((cmd, fn) => {
      fn(undefined, JSON.stringify({ status: 0 }), undefined);
    });
    return sfdx._exec().then(() => true);
  });

  // this will never happen in practice as the cli would always
  // return a status 1 if stderr had data
  // in later versions of the cli it won't even use stderr on 
  // --json calls
  it('should resolve if stderr status === 0', () => {
    exec.mockImplementation((cmd, fn) => {
      fn(undefined, undefined, JSON.stringify({ status: 0 }));
    });
    return sfdx._exec().then(() => true);
  });
}); 