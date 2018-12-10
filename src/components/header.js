import React, { Component } from 'react';
import { GlobalNavigationBar } from '@salesforce/design-system-react';
import { GlobalNavigationBarRegion } from '@salesforce/design-system-react';
import { GlobalNavigationBarLink } from '@salesforce/design-system-react';
import { IconSettings } from '@salesforce/design-system-react';

/**
 * Global navigation header
 */
export default class Header extends Component {

  render() {
    return (
      <IconSettings iconPath="../../public/icons">
        <GlobalNavigationBar>
          <GlobalNavigationBarRegion region="primary">

          </GlobalNavigationBarRegion>
          <GlobalNavigationBarRegion region="secondary">
            <GlobalNavigationBarLink href="/auth" label="Auth"/>
            <GlobalNavigationBarLink href="/scratch" label="Scratch Orgs"/>
            <GlobalNavigationBarLink href="/settings" label="Settings"/>
          </GlobalNavigationBarRegion>
        </GlobalNavigationBar>
      </IconSettings>
    );
  }
}