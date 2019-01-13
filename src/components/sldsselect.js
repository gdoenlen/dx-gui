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