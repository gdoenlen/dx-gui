import React, { Component } from 'react';
import Header from './header';
import {
  Button,
  ButtonGroup,
  DataTable,
  DataTableColumn,
  DataTableRowActions,
  Dropdown,
  PageHeader,
  Modal,
  Spinner
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
    try {
      const result = await sfdx.getOrgs();
      result.result.nonScratchOrgs.forEach((org, i) => org.id = i.toString());
      this.setState({
        auths: result.result.nonScratchOrgs
      });
    } catch (err) {
      console.log('error caught');
    }
  }

  /**
   * Handles the state change from the alias field on the new form.
   * @param {event} event 
   */
  aliasChange(event) {
    this.setState(state => {
      state.form.alias = event.currentTarget.value;
      return state;
    });
  }

  /**
   * Saves a new authorization
   * @param {string} alias - the alias you want the new authorization set to
   */
  async saveAuth(alias) {
    try {
      const result = await sfdx.newAuth(alias);
    } catch (err) {
      //todo
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
                <input id="alias" className="-input" type="text" onChange={this.aliasChange}/>
              </div>
            </div>
          </section>
        </Modal>
      </div>
    );

    let mainContent;
    if (this.state.auths.length) {
      mainContent = (
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
              },
              {
                id: 1,
                label: 'Set Alias',
                value: 'alias'
              }
            ]}
            dropdown={<Dropdown length="5" iconCategory="utility" iconName="down"/>}
            onAction={(item, action) => console.log(item, action)}
          />
        </DataTable>
      );
    } else {
      mainContent = (<Spinner size="large" variant="brand"/>);
    }

    return (
      <React.Fragment>
        <Header/>
        <PageHeader label="Orgs" title="Auths" info={this.state.auths.length === 0 ? '#' : this.state.auths.length.toString()} variant="objectHome" navRight={navRight}/>
        <div>
          {mainContent}
        </div>
      </React.Fragment>
    );
  }
}