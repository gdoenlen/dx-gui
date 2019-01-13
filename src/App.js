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
import './App.css';
import { Auth } from './components/auth';
import Waitable from './components/waitable';
import Header from './components/header';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Scratch } from './components/scratch';
import GlobalErrModal from './components/globalerrmodal';
import { IconSettings } from '@salesforce/design-system-react';
const electron = window.require && window.require('electron');

/**
 * Main app component
 */
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <IconSettings 
          iconPath={electron ? electron.remote.app.getAppPath() + '/icons' : '/icons'}
        >
          <BrowserRouter>
            <div>
              <Header />
              <GlobalErrModal />
              <Waitable>
                <Route exact path="/" component={() => <Auth />} />
                <Route path="/devhubs" component={() => <Auth />} />
                <Route path="/scratch" component={() => <Scratch />} />
              </Waitable>
              {window.location.pathname.endsWith('index.html') && <Redirect to="/" />}
            </div>
          </BrowserRouter>
        </IconSettings>
      </React.Fragment>
    );
  }
}