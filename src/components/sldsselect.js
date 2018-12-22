import React, { Component } from 'react';

export default class SLDSSelect extends Component {
  render() {
    return (
      <div className="slds-form-element">
        <label className="slds-form-element__label" htmlFor="orgSelect">Target Auth</label>
        <div className="slds-select_container">
          <select className="slds-select" onChange={this.props.onChange} name={this.props.name}>
            {this.props.options.map(option => <option value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div className="slds-form-element__help slds-text-color_error">{this.props.error}</div>
      </div>
    );
  }
}