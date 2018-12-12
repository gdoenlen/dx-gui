import React, { Component } from 'react';
import { Spinner } from '@salesforce/design-system-react';
import pubsub from '../services/pubsub';

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
      <React.Fragment>
        <Spinner size="large" variant="brand" containerClassName={this.state.loading === true ? 'slds-visible' : 'slds-hidden' }/>
        {this.props.children}
      </React.Fragment>
    );
  }
}