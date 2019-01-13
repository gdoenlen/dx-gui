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
import { Modal, Button } from '@salesforce/design-system-react';
import pubsub from '../services/pubsub';

/**
 * Global modal for displaying errors.
 */
export default class GlobalErrModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: ''
    };

    pubsub.subscribe('error', (data) => {
      this.setState({
        isOpen: true,
        message: data.message
      });
    });
  }

  render() {
    return  (
      <Modal
        dismissible={false}
        footer={[ 
          <Button label="Ok" onClick={() => this.setState({ isOpen: false, message: '' })} />
        ]}
        isOpen={this.state.isOpen}
        onRequestClose={() => this.setState({ isOpen: false, message: '' })}
        prompt="error"
        size="medium"
        title={<span>Error!</span>}
      >
        <div className="slds-m-around_medium">
          {this.state.message}
        </div>
      </Modal>
    );
  }
}
