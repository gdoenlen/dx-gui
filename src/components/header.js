import React, { Component } from 'react';
import { GlobalNavigationBar } from '@salesforce/design-system-react/components/global-navigation-bar';
import { GlobalNavigationBarRegion } from '@salesforce/design-system-react/components/global-navigation-bar/region';
import { GlobalNavigationBarLink } from '@salesforce/design-system-react/components/global-navigation-bar/link';

/**
 * Global navigation header
 */
export default class Header extends Component {

  render() {
    return (
      <GlobalNavigationBar>
        <GlobalNavigationBarRegion region="primary">

        </GlobalNavigationBarRegion>
        <GlobalNavigationBarRegion region="secondary">
          <GlobalNavigationBarLink href="/auth" label="Auth"/>
          <GlobalNavigationBarLink href="/scratch" label="Scratch Orgs"/>
          <GlobalNavigationBarLink href="/settings" label="Settings"/>
        </GlobalNavigationBarRegion>
      </GlobalNavigationBar>      
    );
  }
}