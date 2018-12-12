import React, { Component } from 'react';
import './App.css';
import Auth from './components/auth';
import Waitable from './components/waitable';
import Header from './components/header';
import { BrowserRouter } from 'react-router-dom';
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <Header />
            <Waitable>
              <Auth />        
            </Waitable>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}