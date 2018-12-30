import React, { Component } from 'react';
import sfdx from '../../services/sfdx';
import pubsub from '../../services/pubsub';
import { ButtonGroup, Button, Modal, PageHeader, DataTable, DataTableColumn, DataTableRowActions } from '@salesforce/design-system-react';
import PullPush from './forms/pullpush';
import NewScratch from './forms/newscratch';

export class Scratch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orgs: {
        nonScratchOrgs: [],
        scratchOrgs: []
      },
      modalOpen: false,
      modal: {

      }
    };
  }

  async componentDidMount() {
    pubsub.publish('loading', true);
    try {
      const orgs = await this.getOrgs();
      this.setState({
        orgs: orgs
      });
      return true;
    } catch (err) {
      pubsub.publish('error', err);
      return false;
    } finally {
      pubsub.publish('loading', false);
    }
  }

  /**
   * Gets all orgs from sfdx force:org:list
   * 
   * @returns {promise} - { scratchOrgs: [], nonScratchOrgs: [] }
   */
  async getOrgs() {
    const res = await sfdx.getOrgs();
    res.result.scratchOrgs.forEach((scratch, i) => {
      scratch.id = i.toString();
      scratch.key = scratch.username
    });
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
      case 'delete': this.delete(item.username); break;
      case 'push':
        this.openModal((<PullPush id="push" onSubmit={values => this.push(values.username, values.projectDef)} username={item.username} />), 'Push Source', 'push'); break;
      case 'pull':
        this.openModal((<PullPush id="pull" onSubmit={values => this.pull(values.username, values.projectDef)} username={item.username} />), 'Pull Source', 'pull'); break;
      default:
    }
  }

  async push(username, dir) {
    pubsub.publish('loading', true);
    try {
      await sfdx.pushSource(username, dir);
      return true;
    } catch (err) {
      pubsub.publish('error', err);
      return false;
    } finally {
      pubsub.publish('loading', false);
      this.setState({
        modalOpen: false
      });
    }
  }

  async pull(username, dir) {
    pubsub.publish('loading', true);
    try {
      await sfdx.pullSource(username, dir);
      return true;
    } catch (err) {
      pubsub.publish('error', err);
    } finally {
      pubsub.publish('loading', false);
      this.setState({
        modalOpen: false
      });
    }
  }

  /**
   * opens a scratch org
   * @param {string} username - username of the scratch org we want to open
   * @returns {boolean} true or false if the operation succeeded 
   */
  async open(username) {
    try {
      await sfdx.openOrg(username);
      return true;
    } catch (err) {
      pubsub.publish('error', err);
      return false;
    }
  }

  /**
   * Deletes a scratch org.
   * @param {string} username - username of the scratch org you want to delete
   * @returns {boolean} - true or false if the operation succeeded or not
   */
  async delete(username) {
    try {
      const res = await sfdx.delete(username);
      this.setState(state => {
        const orgs = state.orgs;
        orgs.scratchOrgs = orgs.scratchOrgs.filter(org => org.orgId !== res.result.orgId);
        return {
          orgs: orgs
        };
      });
      return true;
    } catch (err) {
      pubsub.publish('error', err);
      return false;
    }
  }

  /**
   * Creates a new scratch org from the modal form.
   * This is a long action due to the multiple calls that have to be made to sfdx.
   * @param {object} form
   * @returns {boolean} true or false on succession
   */
  async saveOrg(form) {
    try {
      pubsub.publish('loading', true);
      await sfdx.newScratch(form.auth, form.file, form.alias);

      //the response doesn't provide the info we need for the grid so we have to refresh
      const res = await this.getOrgs();
      this.setState({
        orgs: res
      });

      return true;
    } catch (err) {
      pubsub.publish('error', err);
      return false;
    } finally {
      pubsub.publish('loading', false);
      this.setState({ modalOpen: false });
    }
  }

  /**
   * Opens the modal with the content supplied
   * 
   * @param {component} form - component body for the modal form 
   * @param {string} title - title of the modal
   * @param {string} formName - id of the form for the save submit button
   */
  openModal(form, title, formName) {
    this.setState({
      modalOpen: true,
      modal: {
        title: title,
        body: (
          <section className="slds-m-around_large">
            {form}
          </section>
        ),
        form: formName
      }
    });
  }

  render() {
    const navRight = (
      <React.Fragment>
        <ButtonGroup>
          <Button
            variant="brand"
            label="New"
            onClick={() => this.openModal(
              (<NewScratch
                options={this.state.orgs.nonScratchOrgs.map(nso => ({ value: nso.username, label: nso.username }))}
                onSubmit={values => this.saveOrg(values)}
              />), 'New Scratch Org', 'newScratch'
            )}
          />
        </ButtonGroup>
        <Modal isOpen={this.state.modalOpen} title={this.state.modal.title} onRequestClose={() => this.setState({ modalOpen: false })}
          footer={[
            <Button label="Cancel" onClick={() => this.setState({ modalOpen: false })} />,
          ]}
        >
          {this.state.modal.body}
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
            <DataTableColumn label="Username" property="username" />
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