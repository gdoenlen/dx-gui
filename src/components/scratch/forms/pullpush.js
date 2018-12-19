import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import SLDSFileSelector from '../../sldsfileselector';

export default class PullPush extends Component {
  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={{ projectDef: '' }}
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
                  <SLDSFileSelector accept="application/json" label="Project Definition" name={field.name} error={form.errors && form.errors[field.name]}/>
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    )
  }
}