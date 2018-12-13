import React, { Component } from 'react';
import sfdx from '../services/sfdx';
import pubsub from '../services/pubsub';
import { ButtonGroup, Button, Modal, PageHeader, DataTable, DataTableColumn, DataTableRowActions, Dropdown, Input } from '@salesforce/design-system-react';
import SLDSSelect from './sldsselect';
import SLDSFileSelector from './sldsfileselector';

export default class Scratch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orgs: {
        nonScratchOrgs: [],
        scratchOrgs: []
      },
      modalOpen: false,
      form: {

      }
    };
  }

  async componentDidMount() {
    pubsub.publish('loading', true);
    const orgs = await this.getOrgs();
    this.setState({
      orgs: orgs
    });
    pubsub.publish('loading', false);
  }

  /**
   * Gets all orgs from sfdx force:org:list
   * 
   * @returns {promise} - { scratchOrgs: [], nonScratchOrgs: [] }
   */
  async getOrgs() {
    const res = await sfdx.getOrgs();
    res.result.scratchOrgs.forEach((scratch, i) => scratch.id = i.toString());
    return res.result;
  }

  /**
   * Handles the action event from the datatable rows
   * 
   * @param {any} item 
   * @param {any} action 
   */
  handleRowAction(item, action) {
    switch (action.value) {
      case 'open': this.open(item.username); break;
      default:
    }
  }

  /**
   * opens a scratch org
   * @param {string} username - username of the scratch org we want to open
   */
  async open(username) {
    try {
      await sfdx.openOrg(username);
    } catch (err) {
      pubsub.publish('error', err);
    }
  }

  render() {
    const navRight = (
      <React.Fragment>
        <ButtonGroup>
          <Button variant="brand" label="New" onClick={() => this.setState({ modalOpen: true })}/>
        </ButtonGroup>
        <Modal isOpen={this.state.modalOpen} title="New Scratch Org" onRequestClose={() => this.setState({ modalOpen: false})}
              footer={[
                <Button label="Cancel" onClick={() => this.setState({ modalOpen: false })} />,
                <Button label="Save" onClick={() => alert('todo!')} />
              ]}
        >
          <section>
            <div className="slds-form slds-form_stacked slds-m-around_large">
              <SLDSSelect
                options={this.state.orgs.nonScratchOrgs.map((auth, i) => { 
                  const option = {
                    value: auth.username, label: auth.username
                  }
                  if (i === 0) {
                    option.selected = 'selected';
                  }
                  return option;
                })}
                onChange={(e) => this.setState(state => {
                  state.form.orgSelect = e.currentTarget.options.find(option => option.selected);
                  return {
                    form: state.form
                  };
                })}
              />
              <Input label="Alias" onChange={(e) => this.setState(state => {
                const form = state.form;
                form.alias = e.currentTarget.value;
                return {
                  form: form
                };
              })} />
              <SLDSFileSelector onChange={(e) => {
                const target = e.currentTarget;  
                this.setState(state => {
                  const form = state.form;
                  form.scratchDef = target.files[0].path;
                  console.log(target);
                  return {
                    form: form
                  };
                })
              }} />
              <span className="slds-form-element__help">{this.state.form.scratchDef}</span>
            </div>
          </section>  
        </Modal>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <PageHeader 
          label="Orgs"
          title="Scratch Orgs" 
          info={this.state.orgs.scratchOrgs.length === 0 ? '#' : this.state.orgs.scratchOrgs.length.toString()}
          variant="objectHome"
          navRight={navRight}
        />
        <div>
          <DataTable items={this.state.orgs.scratchOrgs}>
            <DataTableColumn label="Alias" property="alias" />
            <DataTableColumn label="Org Id" property="orgId" />
            <DataTableColumn label="Org Name" property="orgName" />
            <DataTableColumn label="Username" property="username"/>
            <DataTableColumn label="DevHub Username" property="devHubUsername" />
            <DataTableColumn label="Status" property="status" />
            <DataTableColumn label="Expires" property="expirationDate" />
            <DataTableRowActions 
              options={[
                {
                  id: 0,
                  label: 'Open',
                  value: 'open'
                },
                {
                  id: 1,
                  label: 'Push Source',
                  value: 'push'
                },
                {
                  id: 2,
                  label: 'Pull Source',
                  value: 'pull'
                },
                {
                  id: 3,
                  label: 'Delete',
                  value: 'Delete'
                }
              ]}
              dropdown={<Dropdown length="5" />}
              onAction={(item, action) => this.handleRowAction(item, action)}
            />
          </DataTable>
        </div>
      </React.Fragment>
    );
  }
}