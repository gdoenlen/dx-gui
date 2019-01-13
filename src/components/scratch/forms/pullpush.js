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