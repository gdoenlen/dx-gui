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
import { Spinner } from '@salesforce/design-system-react';
import pubsub from '../services/pubsub';

/**
 * Simple component to show or hide a global spinner based on events
 */
export default class Waitable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    pubsub.subscribe('loading', (data) => this.setState({ loading: data }));
  }

  render() {
    return (
      // this stuff probably doesn't need to be together, we can probably just make the spinner its own component
      // without children
      <React.Fragment>
        <Spinner size="large" variant="brand" containerClassName={this.state.loading === true ? 'slds-visible' : 'slds-hidden' }/>
        {this.props.children}
      </React.Fragment>
    );
  }
}
