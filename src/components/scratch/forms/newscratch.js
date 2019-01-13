/*
 *  DXGUI - GUI Client for the sfdx cli
 *  Copyright (C) 2019 George Doenlen
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import SLDSSelect from '../../sldsselect';
import { Input, Button } from '@salesforce/design-system-react';
import SLDSFileSelector from '../../sldsfileselector';
import PropTypes from 'prop-types';

/**
 * Form for creating a new scratch org
 */
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

NewScratch.propTypes = {
  /** array of objects with value/label fields */
  options: PropTypes.array.isRequired,

  /** onSubmit function for the form */
  onSubmit: PropTypes.func.isRequired,
};