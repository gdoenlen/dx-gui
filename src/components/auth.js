import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  DataTable,
  DataTableColumn,
  DataTableRowActions,
  Dropdown,
  PageHeader,
  Modal
} from '@salesforce/design-system-react';
import sfdx from '../services/sfdx';

/**
 * Authorization panel component
 */
export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      auths: [],
      form: {

      }
    };

    this.aliasChange = this.aliasChange.bind(this);
  }

  async componentDidMount() {
    await this.getOrgs();
    this.props.toggleLoading();
  }

  async getOrgs() {
    const res = await sfdx.getOrgs();
    res.result.nonScratchOrgs.forEach((org, i) => org.id = i.toString());
    this.setState({
      auths: res.result.nonScratchOrgs
    });
  }

  /**
   * Handles the state change from the alias field on the new form.
   * @param {event} event 
   */
  aliasChange(event) {
    this.setState({
      form: {
        alias: event.currentTarget.value
      }
    });
  }
  /**
   * Saves a new authorization
   * @param {string} alias - the alias you want the new authorization set to
   */
  async saveAuth(alias) {
    const res = await sfdx.newAuth(alias);
    if (res.status === 0) {
      this.props.toggleLoading();
      this.setState({ modalOpen: false });
      this.getOrgs().then(() => this.props.toggleLoading());
    }
  }

  async handleRowAction(item, action) {
    switch (action.value) {
      case 'delete': this.delete(item.username); break;
      default: throw new Error('No case for this action');
    }
  }

  /**
   * Deletes an authorization from sfdx
   * 
   * @param {string} username 
   * @returns {promise}
   */
  async delete(username) {
    const res = await sfdx.logout(username);
    this.setState(state => 
      ({ auths: state.auths.filter(auth => auth.username !== res.result[0])})
    );
  }

  render() {
    const navRight = (
      <div>
        <ButtonGroup>
          <Button variant="brand" label="New" onClick={() => this.setState({ modalOpen: true, edit: {} })}/>
        </ButtonGroup>
        <Modal 
          isOpen={this.state.modalOpen} 
          title="New Auth" 
          onRequestClose={() => this.setState({ modalOpen: false })}
          footer={[
            <Button label="Cancel" onClick={() => this.setState({ modalOpen: false})}/>,
            <Button label="Save" onClick={() => this.saveAuth(this.state.form.alias)}/>
          ]}  
        >
          <section className="slds-p-around_large">
            <div className="slds-form-element slds-m-bottom_large">
              <label className="slds-form-element_label" htmlFor="alias">
                Alias
              </label>
              <div className="slds-form-element_control">
                <input id="alias" className="slds-input" type="text" onChange={this.aliasChange} placeholder="Optional"/>
              </div>
            </div>
          </section>
        </Modal>
      </div>
    );

    return (
      <React.Fragment>
        <PageHeader label="Orgs" title="Auths" info={this.state.auths.length === 0 ? '#' : this.state.auths.length.toString()} variant="objectHome" navRight={navRight}/>
        <div>
          <DataTable items={this.state.auths}>
            <DataTableColumn label="Alias" property="alias"/>
            <DataTableColumn label="Username" property="username"/>
            <DataTableColumn label="Org Id" property="orgId"/>
            <DataTableColumn label="Connected Status" property="connectedStatus"/>
            <DataTableRowActions options={[
                {
                  id: 0, 
                  label: 'Delete',
                  value: 'delete'
                }
              ]}
              dropdown={<Dropdown length="5" iconCategory="utility" iconName="down"/>}
              onAction={(item, action) => this.handleRowAction(item, action)}
           />
          </DataTable>
        </div>
      </React.Fragment>
    );
  }
}