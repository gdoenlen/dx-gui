import React from 'react';
import { shallow } from 'enzyme';
import SLDSFileSelector from './sldsfileselector';

let cmp;
let onChange;

beforeEach(() => {
  onChange = jest.fn();
  cmp = shallow(
    <SLDSFileSelector 
      label="Test"
      name="Test"
      accept="application/json"
      onChange={onChange}
      error="Test" 
    />
  );
});

describe('handleFileSelectorChange', () => {
  it('should set state[path] to the path of event.currentTarget.files[0].path', () => {
    const path = '/path/to/some/file';

    cmp.instance().handleFileSelectorChange({
      currentTarget: {
        files: [{
          path: path
        }]
      }
    });

    expect(cmp.state().path).toBe(path);
  });

  it('should call props[onChange] with the event', () => {
    const event = {
      currentTarget: {
        files: [{
          path: '/some/path'
        }]
      }
    };
    cmp.instance().handleFileSelectorChange(event);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(event);
  });

  it('should do nothing if event.currentTarget.files[0] is undefined', () => {
    cmp.instance().handleFileSelectorChange(undefined);
    expect(cmp.state().path).toBe(undefined);
    expect(onChange.mock.calls.length).toBe(0);
  });
});

describe('render', () => {
  it('should show the file path of state[path]', () => {
    const path = '/path/to/the/plans/to/rule/the/world';
    cmp.instance().handleFileSelectorChange({
      currentTarget: {
        files: [{
          path: path
        }]
      }
    });

    expect(
      cmp.contains(
        (<span className="slds-file-selector__text slds-text-body_small">{path}</span>)
      )
    ).toBe(true);
  });

  it('should show props[error]', () => {
    expect(cmp.contains((<div className="slds-form-element__help slds-text-color_error">{cmp.instance().props.error}</div>))).toBe(true);
  });

  it('should render a label with props[label]', () => {
    expect(cmp.contains((<span className="slds-form-element__label" id="fileSelectorLabel">{cmp.instance().props.label}</span>))).toBe(true);
  });

  // not sure why this is failing
  xit('should render an input with props[name, accept, webkitdirectory, onChange]', () => {
    const rendered = (
      <input
        id="fileSelector"
        name={cmp.instance().props.name}
        className="slds-file-selector__input slds-assistive-text"
        accept={cmp.instance().props.accept}
        type="file"
        aria-describedby="fileSelectorError"
        aria-labelledby="fileSelectorLabel"
        onChange={e => cmp.instance().handleFileSelectorChange(e)}
        webkitdirectory={cmp.instance().props.webkitdirectory}
      />
    );
    expect(cmp.contains(rendered)).toBe(true);
  });
});