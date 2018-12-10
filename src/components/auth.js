import React, { Component } from 'react';
import Header from './header';
import {
  Button,
  ButtonGroup,
  DataTable,
  DataTableColumn,
  DataTableRowActions,
  Dropdown,
  PageHeader
} from '@salesforce/design-system-react';

/**
 * Authorization panel component
 */
export default class Auth extends Component {

  render() {
    const navRight = (
      <div>
        <ButtonGroup>
          <Button variant="brand" label="New"/>
        </ButtonGroup>
      </div>
    );
    return (
      <React.Fragment>
        <Header/>
        <PageHeader label="Auths" title="Auths" info="# of items" variant="objectHome" navRight={navRight}/>
        <div>
          <DataTable items={[
            {
              id: '1',
              alias: 'gd',
              username: 'gd@example.com',
              orgId: '1234',
              connectedStatus: 'connected'
            }
          ]}>
            <DataTableColumn label="Alias" property="alias"/>
            <DataTableColumn label="Username" property="username"/>
            <DataTableColumn label="Org Id" property="orgId"/>
            <DataTableColumn label="Connected Status" property="connectedStatus"/>
            <DataTableRowActions options={[
                {
                  id: 0,
                  label: 'Edit',
                  value: '1'
                },
                {
                  id: 1, 
                  label: 'Delete',
                  value: '2'
                },
                {
                  id: 2,
                  label: 'Set Alias',
                  value: '3'
                }
              ]}
              dropdown={<Dropdown length="5" iconCategory="utility" iconName="down"/>}
            />
          </DataTable>
        </div>
      </React.Fragment>
    );
  }
}