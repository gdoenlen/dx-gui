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