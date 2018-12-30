import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import SLDSFileSelector from '../../sldsfileselector';
import { Button } from '@salesforce/design-system-react';
import pubsub from '../../../services/pubsub';

export default class PullPush extends Component {
  
  /**
   * Handles the 7
   * @param {object} values - the form values from formik
   * @returns {boolean} - true or false depending on if an error was caught or not
   */
  async handleSubmit(values) {
    pubsub.publish('loading', true);
    try {
      await this.props.onSubmit(values);
      return true
    } catch (err) {
      pubsub.publish('error', err);
      return false;
    } finally {
      pubsub.publish('loading', false);
    }
  }

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
          onSubmit={this.handleSubmit}
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
    )
  }
}