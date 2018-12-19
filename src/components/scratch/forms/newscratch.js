import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import SLDSSelect from '../../sldsselect';
import { Input } from '@salesforce/design-system-react';
import SLDSFileSelector from '../../sldsfileselector';

export default class NewScratch extends Component {
  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={{

          }}
          validate={() => {

          }}
          onSubmit={this.props.onSubmit}
        >
          {() => (
            <Form id={this.props.id}>
              <Field name="auth">
                {({ field, form }) => (
                  <SLDSSelect options={this.props.options} />
                )}
              </Field>
              <Field name="alias">
                {({ field, form }) => (
                  <Input label="Alias" />
                )}
              </Field>
              <Field name="file">
                  {({field, form}) => (
                    <SLDSFileSelector 
                      accept="application/json" 
                      name={field.name}
                      label="Scratch Definition"
                      error={form.errors && form.errors[field.name]}
                    />  
                  )}
              </Field>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}