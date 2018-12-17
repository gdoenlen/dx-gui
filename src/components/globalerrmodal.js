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