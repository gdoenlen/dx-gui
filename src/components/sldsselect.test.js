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

import React from 'react';
import { shallow } from 'enzyme';
import SLDSSelect from './sldsselect';

let cmp;

beforeEach(() => {
  cmp = shallow(
    <SLDSSelect 
      name="Test"
      onChange={() => {}}
      options={[{ value: "Test", label: "Test" }]}
      error=""
    />
  );
});

describe('render', () => {
  it('should show props[error]', () => {
    expect(cmp.contains((<div className="slds-form-element__help slds-text-color_error">{cmp.instance().props.error}</div>)))
      .toBe(true);
  });

  it('should render a select with props[onChange, name] and options with props[options]', () => {
    expect(cmp.contains(
      <select className="slds-select" onChange={cmp.instance().props.onChange} name={cmp.instance().props.name}>
        {cmp.instance().props.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    )).toBe(true);
  });
})