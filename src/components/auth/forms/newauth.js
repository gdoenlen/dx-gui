import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button } from '@salesforce/design-system-react';

/**
 * Form for when you want to create a new devhub/authorization
 */
export class NewAuth extends Component {
  render() {
    return (
      <Formik
        onSubmit={this.props.onSubmit}
      >
        {() => (
          <Form>
            <Field name="alias">
              {({ field, form }) => (
                <Input 
                  label="Alias" 
                  onChange={event => form.setFieldValue(field.name, event.currentTarget.value)}
                  error={form.errors && form.errors[field.name]}
                />
              )}
            </Field>
            <Button type="submit" label="Save" variant="brand" className="slds-m-top_small"/>
          </Form>
        )}
      </Formik>
    );
  }
}