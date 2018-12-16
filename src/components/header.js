import React, { Component } from 'react';
import { GlobalNavigationBar } from '@salesforce/design-system-react';
import { GlobalNavigationBarRegion } from '@salesforce/design-system-react';
import { IconSettings } from '@salesforce/design-system-react';
import RoutableGlobalNavigationBarLink from './routableglobalnavigationbarlink';

/**
 * Global navigation header
 */
export default class Header extends Component {

  render() {
    return (
      <IconSettings iconPath="../../public/icons">
        <GlobalNavigationBar>
          <GlobalNavigationBarRegion region="primary">
            <div className="slds-align_absolute-center slds-p-right_large">
              <h2>SFDX</h2>
            </div>
          </GlobalNavigationBarRegion>
          <GlobalNavigationBarRegion region="secondary">
            <RoutableGlobalNavigationBarLink href="/about" label="About"/>
            <RoutableGlobalNavigationBarLink href="/devhubs" label="DevHubs"/>
            <RoutableGlobalNavigationBarLink href="/scratch" label="Scratch Orgs"/>
            <RoutableGlobalNavigationBarLink href="/settings" label="Settings"/>
          </GlobalNavigationBarRegion>
        </GlobalNavigationBar>
      </IconSettings>
    );
  }
}