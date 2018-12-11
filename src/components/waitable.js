import React, { Component } from 'react';
import { Spinner } from '@salesforce/design-system-react';

export default class Waitable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  toggleLoading() {
    this.setState(state => ({ loading: !state.loading }));
  }

  render() {
    return (
      <React.Fragment>
        <Spinner size="large" variant="brand" containerClassName={this.state.loading === true ? 'slds-visible' : 'slds-hidden' }/>
        {React.cloneElement(this.props.children, { toggleLoading: this.toggleLoading.bind(this) })}
      </React.Fragment>
    );
  }
}