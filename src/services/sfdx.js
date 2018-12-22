//this only works when running from electron!!
//todo polyfill this some how so we can work on the ui without electron
const exec = window.require('child_process').exec;
const { chdir, cwd } = window.process; 

/**
 * Service to interact with the native sfdx binary.
 */
export class SfdxService {
  
  /**
   * Creates a new service
   * @constructor 
   * @param {function} exec - executes a function against a system binary
   * @param {function} chdir - changes the current working directory
   * @Param {function} cwd - gets the current working directory
   */
  constructor(exec, chdir, cwd) {
    this.exec = exec;
    this.chdir = chdir;
    this.cwd = cwd;
  }

  /**
   * Creates a new authorization
   * @param {string} alias - the alias to set for this auth
   * @returns {promise}
   */
  async newAuth(alias) {
    let cmd = 'sfdx force:auth:web:login --json';
    if (alias) {
      cmd += ` --setalias ${alias}`;
    }
    
    return this._exec(cmd);
  }

  /**
   * Gets all org listings
   * { status: 0, result: { nonScratchOrgs: [], scratchOrgs: []} }
   * @returns {promise}
   */
  async getOrgs() {
    return this._exec('sfdx force:org:list --json --all');
  }

  /**
   * Sets an alias on an org
   * @param {string} username - username of the org you want to set
   * @param {string} alias - the alias to associate with this username
   * @returns {promise}
   */
  async setAlias(username, alias) {
    return this._exec(`sfdx force:alias:set ${alias}=${username}`);
  }

  /**
   * Logs out a username from sfdx via foce:auth:logout
   * @param {string} username - the username to logout
   * @returns {promise}
   */
  async logout(username) {
    return this._exec(`sfdx force:auth:logout -p -u ${username} --json`);
  }

  /**
   * Opens a specific scratch org
   * @param {string} username - username of the org we want to open
   * @returns {promise}
   */
  async openOrg(username) {
    const cmd = `sfdx force:org:open -u ${username} --json`;
    return this._exec(cmd);
  }

  /**
   * Deletes a scratch org
   * @param {string} username - username of the scratch org we want to delete
   * @returns {promise}
   */
  async delete(username) {
    return this._exec(`sfdx force:org:delete -u ${username} -p --json`);
  }
  
  /**
   * Creates a new scratch org 
   * @param {string} auth - devhub username to create the scratch org with 
   * @param {string} scratchDef - path to the scratch definition
   * @param {string} alias - alias for the scratch org, optional 
   */
  async newScratch(auth, scratchDef, alias) {
    let cmd = `sfdx force:org:create -v ${auth} -f ${scratchDef} --json`;
    if (alias) {
      cmd += ` -a ${alias}`;
    } 
    return this._exec(cmd);
  }

  /**
   * Pushes source to the given org from the given project 
   * 
   * @param {string} username - username of the scratch org you want to push to
   * @param {string} dir - the directory of the project you want to push from 
   */
  async pushSource(username, dir) {
    try {
      const cwd = this.cwd();
      this.chdir(dir);
      return this._exec(`sfdx force:source:push -u ${username} --json`).finally(() => this.chdir(cwd));
    } catch (err) {
      //todo probably should wrap the error to look like an sfdx error
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }    
  }

  /**
   * Pulls source from the given scratch org into the given project 
   * 
   * @param {string} username - scratch org username that you want to pull from
   * @param {string} dir - the directory you want to pull into
   */
  async pullSource(username, dir) {
    try {
      const cwd = this.cwd();
      this.chdir(dir);
      return this._exec(`sfdx force:source:pull -u ${username} --json`).finally(() => this.chdir(cwd));
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }

  /**
   * Executes a shell command, all commands executed here
   * are expected to use the --json flag for json output.
   * When using --json all output is sent to stdout even on err in versions >= 45.
   * 
   * @param {string} cmd - shell command to execute
   * @returns {promise}
   */
  async _exec(cmd) {
    return new Promise((resolve, reject) => {
      this.exec(cmd, (err, stdout, stderr) => {
        const res = stdout === undefined || stdout === '' ? stderr : stdout;
        const result = JSON.parse(res);
        if (result.status === 0) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
}

const sfdx = new SfdxService(exec, chdir, cwd);
export default sfdx;