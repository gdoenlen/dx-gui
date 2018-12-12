import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class RoutableGlobalNavigationBarLink extends Component {
  render() {
    return (
      <li className="slds-context-bar__item">
        <NavLink to={this.props.href} className="slds-context-bar__label-action" activeClassName="slds-is-active">
          {this.props.label}
        </NavLink>
      </li>
    );
  }
}