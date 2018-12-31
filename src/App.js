import React, { Component } from 'react';
import './App.css';
import { Auth } from './components/auth';
import Waitable from './components/waitable';
import Header from './components/header';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Scratch } from './components/scratch';
import GlobalErrModal from './components/globalerrmodal';
import { IconSettings } from '@salesforce/design-system-react';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <IconSettings iconPath={process.env.PUBLIC_URL + '/icons'}>
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