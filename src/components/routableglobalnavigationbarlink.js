import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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