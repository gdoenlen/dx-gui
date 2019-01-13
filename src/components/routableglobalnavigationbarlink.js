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
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Navigation bar link meant to mimic the GlobalNavigationBarLink from the react design system.
 * This implementation allows use of react router.
 */
export default class RoutableGlobalNavigationBarLink extends Component {
  render() {
    return (
      <li className="slds-context-bar__item">
        <NavLink to={this.props.href} className="slds-context-bar__label-action" activeClassName="slds-is-active">
          <span className="slds-truncate">{this.props.label}</span>
        </NavLink>
      </li>
    );
  }
}

RoutableGlobalNavigationBarLink.propTypes = {
  /** path for the router NavLink `to` prop */
  href: PropTypes.string.isRequired,

  /** label for the link element */
  label: PropTypes.string.isRequired
};