import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import SLDSFileSelector from '../../sldsfileselector';
import { Button } from '@salesforce/design-system-react';

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
    )
  }
}