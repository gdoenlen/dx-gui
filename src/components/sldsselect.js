import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * SLDS Select element
 */
export default class SLDSSelect extends Component {
  render() {
    return (
      <div className="slds-form-element">
        <label className="slds-form-element__label" htmlFor="orgSelect">Target Auth</label>
        <div className="slds-select_container">
          <select className="slds-select" onChange={this.props.onChange} name={this.props.name}>
            {this.props.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div className="slds-form-element__help slds-text-color_error">{this.props.error}</div>
      </div>
    );
  }
}

SLDSSelect.propTypes = {
  /** onChange function for the select element */
  onChange: PropTypes.func.isRequired,

  /** name prop for the select element */
  name: PropTypes.string.isRequired,

  /** Array of objects with value/label for the option elements */
  options: PropTypes.array.isRequired,

  /** any error message to be displayed */
  error: PropTypes.string
};