/*
 *  DXGUI - GUI Client for the sfdx cli
 *  Copyright (C) 2019 George Doenlen
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  DataTable,
  DataTableColumn,
  DataTableRowActions,
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
    try { 
      await this.getOrgs();
    } catch (err) {
      pubsub.publish('error', err);
    } finally {
      pubsub.publish('loading', false);
    }
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
      // we only want to set loading to true here if
      // the user completes a new auth
      // if they don't the ui will actually become locked
      // as sfdx is waiting on the callback from the browser
      if (res.status === 0) {
        pubsub.publish('loading', true);
        this.setState({ modalOpen: false });
        await this.getOrgs();
      }
    } catch (err) {
      pubsub.publish('error', err);
    } finally {
      pubsub.publish('loading', false);
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
              onAction={(item, action) => this.handleRowAction(item, action)}
           />
          </DataTable>
        </div>
      </React.Fragment>
    );
  }
}
