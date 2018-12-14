//this only works when running from electron!!
//todo polyfill this some how so we can work on the ui without electron
const exec = window.require('child_process').exec;

/**
 * Service to interact with the native sfdx binary.
 */
export class SfdxService {
  
  /**
   * Creates a new service
   * @constructor 
   * @param {function} exec - executes a function against a system binary 
   */
  constructor(exec) {
    this.exec = exec;
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
   * Executes a shell command, all commands executed here
   * are expected to use the --json flag for json output.
   * When using --json all output is sent to stdout even on err.
   * 
   * @param {string} cmd - shell command to execute
   * @returns {promise}
   */
  async _exec(cmd) {
    return new Promise((resolve, reject) => {
      this.exec(cmd, (err, stdout, stderr) => {
        //all --json commands go to stdout, even on err
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

const sfdx = new SfdxService(exec);
export default sfdx;