import React, { Component } from 'react';
import './App.css';
import Auth from './components/auth';
import Waitable from './components/waitable';
import Header from './components/header';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Waitable>
          <Auth />        
        </Waitable>
      </React.Fragment>
    );
  }
}