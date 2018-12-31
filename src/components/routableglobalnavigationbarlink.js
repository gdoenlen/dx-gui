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