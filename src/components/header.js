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
            <RoutableGlobalNavigationBarLink href="/devhubs" label="DevHubs"/>
            <RoutableGlobalNavigationBarLink href="/scratch" label="Scratch Orgs"/>
          </GlobalNavigationBarRegion>
        </GlobalNavigationBar>
      </IconSettings>
    );
  }
}