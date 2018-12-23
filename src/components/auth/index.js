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
import sfdx from '../../services/sfdx';
import pubsub from '../../services/pubsub';
import { NewAuth } from './forms/newauth';

/**
 * Authorization panel component
 */
export class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      auths: [],
    };
  }

  async componentDidMount() {
    pubsub.publish('loading', true);
    await this.getOrgs();
    pubsub.publish('loading', false);
  }

  async getOrgs() {
    const res = await sfdx.getOrgs();
    res.result.nonScratchOrgs.forEach((org, i) => org.id = i.toString());
    this.setState({
      auths: res.result.nonScratchOrgs
    });
  }

  /**
   * Saves a new authorization
   * @param {string} alias - the alias you want the new authorization set to
   */
  async saveAuth(alias) {
    try {
      const res = await sfdx.newAuth(alias);
      if (res.status === 0) {
        pubsub.publish('loading', true);
        this.setState({ modalOpen: false });
        this.getOrgs().then(() => pubsub.publish('loading', false));
      }
    } catch (err) {
      pubsub.publish('error', err);
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
    try {
      const res = await sfdx.logout(username);
      this.setState(state => 
        ({ auths: state.auths.filter(auth => auth.username !== res.result[0])})
      );
    } catch (err) {
      pubsub.publish('error', err);
    }
  }

  render() {
    const navRight = (
      <div>
        <ButtonGroup>
          <Button variant="brand" label="New" onClick={() => this.setState({ modalOpen: true })}/>
        </ButtonGroup>
        <Modal 
          isOpen={this.state.modalOpen} 
          title="New DevHub" 
          onRequestClose={() => this.setState({ modalOpen: false })}
          footer={[
            <Button label="Cancel" onClick={() => this.setState({ modalOpen: false})}/>
          ]}  
        >
          <section className="slds-p-around_large">
            <NewAuth onSubmit={values => this.saveAuth(values.alias)} />
          </section>
        </Modal>
      </div>
    );

    return (
      <React.Fragment>
        <PageHeader label="Orgs" title="DevHubs" info={this.state.auths.length === 0 ? '#' : this.state.auths.length.toString()} variant="objectHome" navRight={navRight}/>
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