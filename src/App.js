import React, { Component } from 'react';
import { RouterMixin } from 'react-mini-router';
import './App.css';

const App = React.createClass({
  mixins: [RouterMixin],
  routes: {
    '/': 'about',
    '/about': 'about',
    '/settings': 'settings',
    '/auth': 'auth',
    '/scratch': 'scratch'
  },
  render: () => {
    return this.renderCurrentRoute();
  },
  about: () => {

  },
  settings: () => {

  },
  auth: () => {

  },
  scratch: () => {

  }
});

export default App;
