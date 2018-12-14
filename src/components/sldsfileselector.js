import React, { Component } from 'react';

/**
 * Salesforce Lightning Design System file upload component
 * https://lightningdesignsystem.com/components/file-selector/
 */
export default class SLDSFileSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  handleFileSelectorChange(event) {
    const target = event.currentTarget;
    this.setState({
      fileName: target.files[0].path
    });

    this.props.onChange(event);
  }

  render() {
    return (
      <div className="slds-form-element">
        <span className="slds-form-element__label" id="fileSelectorLabel">Scratch Definition</span>
        <div className="slds-form-element__control">
          <div className="slds-file-selector slds-file-selector_files">
            <div className="slds-file-selector__dropzone">
              <input 
                id="fileSelector"
                className="slds-file-selector__input slds-assistive-text" 
                accept="application/json" 
                type="file"
                aria-describedby="fileSelectorError"
                aria-labelledby="fileSelectorLabel"
                onChange={(e) => this.handleFileSelectorChange(e)}
              />
              <label className="slds-file-selector__body" htmlFor="fileSelector">
                <span className="slds-file-selector__button slds-button slds-button_neutral">
                  Browse
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="slds-form-element__help">{this.state.fileName}</div>
      </div>
    );
  }
}