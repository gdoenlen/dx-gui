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

  /**
   * Handles what happens when a file is selected. First sets the display value
   * of the path and then fires the supplied onChange event
   * 
   * @param {event} event - the event that triggered this to fire 
   */
  handleFileSelectorChange(event) {
    const target = event.currentTarget;

    //sometimes when you click cancel there won't be a file value
    if (target.files && target.files[0]) {
      this.setState({
        path: target.files[0].path
      });

      this.props.onChange(event);
    }
  }

  render() {
    return (
      <div className={'slds-form-element' + this.props.error ? ' slds-has-error' : ''}>
        <span className="slds-form-element__label" id="fileSelectorLabel">{this.props.label}</span>
        <div className="slds-form-element__control">
          <div className="slds-file-selector slds-file-selector_files">
            <div className="slds-file-selector__dropzone">
              <input 
                id="fileSelector"
                name={this.props.name}
                className="slds-file-selector__input slds-assistive-text" 
                accept={this.props.accept} 
                type="file"
                aria-describedby="fileSelectorError"
                aria-labelledby="fileSelectorLabel"
                onChange={e => this.handleFileSelectorChange(e)}
                webkitdirectory={this.props.webkitdirectory}
              />
              <label className="slds-file-selector__body" htmlFor="fileSelector">
                <span className="slds-file-selector__button slds-button slds-button_neutral">
                  Browse
                </span>
                <span className="slds-file-selector__text slds-text-body_small">{this.state.path}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="slds-form-element__help slds-text-color_error">{this.props.error}</div>
      </div>
    );
  }
}