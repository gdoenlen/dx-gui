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
import { Formik, Form, Field } from 'formik';
import { Input, Button } from '@salesforce/design-system-react';
import PropTypes from 'prop-types';

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

NewAuth.propTypes = {
  /** onSubmit function for the form */
  onSubmit: PropTypes.func.isRequired,
};