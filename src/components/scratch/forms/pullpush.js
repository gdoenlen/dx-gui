import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import SLDSFileSelector from '../../sldsfileselector';
import { Button } from '@salesforce/design-system-react';
import PropTypes from 'prop-types';

/**
 * Form for pulling or pushing from a scratch org.
 */
export default class PullPush extends Component {
  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={{ 
            projectDef: '',
            username: this.props.username
          }}
          validate={ values => {
            if (!values.projectDef) {
              return {
                projectDef: 'Required'
              };
            }
          }}
          onSubmit={this.props.onSubmit}
        >
          {() => (
            <Form id={this.props.id} className="slds-form slds-form_stacked">
              <Field name="projectDef">
                {({ field, form }) => (
                  <SLDSFileSelector 
                    webkitdirectory="true"
                    label="Project Location" 
                    name={field.name} 
                    error={form.errors && form.errors[field.name]}
                    onChange={event => form.setFieldValue(field.name, event.currentTarget.files[0].path)}
                  />
                )}
              </Field>
              <Button type="submit" label="Save" variant="brand" className="slds-m-top_small"/>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}

PullPush.propTypes = {
  /** The default value for the username for the form */
  username: PropTypes.string.isRequired,

  /** The function to be called when the form is submitted */
  onSubmit: PropTypes.func.isRequired,

  /** 
   * Id of the form element, this will be used when we move the
   * submit button outside of the form
   */
  id: PropTypes.string.isRequired,
};