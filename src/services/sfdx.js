//this only works when running from electron!!
//todo polyfill this some how so we can work on the ui without electron
const exec = window.require('child_process').exec;

/**
 * Service to interact with the native sfdx binary.
 */
class SfdxService {
  
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
    return this._exec('sfdx force:org:list --json');
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
   * Executes a shell command 
   * @param {string} cmd - shell command to execute
   * @returns {promise}
   */
  async _exec(cmd) {
    return new Promise((resolve, reject) => {
      this.exec(cmd, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(stdout));
        }
      });
    });
  }
}

const sfdx = new SfdxService(exec);
export default sfdx;