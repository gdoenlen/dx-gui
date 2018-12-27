import React from 'react';
import RoutableGlobalNavigationBarLink from './routableglobalnavigationbarlink';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

let cmp;

beforeEach(() => {
  cmp = shallow(<RoutableGlobalNavigationBarLink href="#" label="Test"/>);
});

it('should render an li with a react-router-dom NavLink', () => {
  const rendered = (
    <li className="slds-context-bar__item">
      <NavLink to="#" className="slds-context-bar__label-action" activeClassName="slds-is-active">
        <span className="slds-truncate">Test</span>
      </NavLink>
    </li>
  );
  
  expect(cmp.contains(rendered)).toBe(true);
});