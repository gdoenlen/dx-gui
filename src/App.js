import React, { Component } from 'react';
import './App.css';
import Auth from './components/auth';
import Waitable from './components/waitable';
import Header from './components/header';
import { BrowserRouter, Route } from 'react-router-dom';
import Scratch from './components/scratch';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <Header />
            <Waitable>
              <Route exact path="/" component={() => <Auth />}/>        
              <Route path="/auth" component={() => <Auth />}/>
              <Route path="/scratch" component={() => <Scratch />} />
            </Waitable>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}