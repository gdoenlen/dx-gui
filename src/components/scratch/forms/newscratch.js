import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import SLDSSelect from '../../sldsselect';
import { Input, Button } from '@salesforce/design-system-react';
import SLDSFileSelector from '../../sldsfileselector';

export default class NewScratch extends Component {
  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            auth: this.props.options[0].value
          }}
          validate={values => {
            const err = {};
            if (!values.file) {
              err.file = 'Required';
            }
            if (!values.auth) {
              err.auth = 'Required';
            }

            return err;
          }}
          onSubmit={this.props.onSubmit}
        >
          {() => (
            <Form id={this.props.id}>
              <Field name="auth">
                {({ field, form }) => (
                  <SLDSSelect 
                    options={this.props.options}
                    name={field.name} 
                    onChange={event => form.setFieldValue(field.name, event.currentTarget.value)}
                    error={form.errors && form.errors[field.name]}
                  />
                )}
              </Field>
              <Field name="alias">
                {({ field, form }) => (
                  <Input 
                    label="Alias" 
                    name={field.name} 
                    onChange={event => form.setFieldValue(field.name, event.currentTarget.value)}
                  />
                )}
              </Field>
              <Field name="file">
                  {({field, form}) => (
                    <SLDSFileSelector 
                      accept="application/json" 
                      name={field.name}
                      label="Scratch Definition"
                      error={form.errors && form.errors[field.name]}
                      onChange={event => form.setFieldValue(field.name,  event.currentTarget.files[0].path)}
                    />  
                  )}
              </Field>
              <Button type="submit" label="Save" variant="brand" className="slds-m-top_small" />
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}