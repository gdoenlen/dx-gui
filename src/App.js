import React, { Component } from 'react';
import './App.css';
import { Auth } from './components/auth';
import Waitable from './components/waitable';
import Header from './components/header';
import { BrowserRouter, Route } from 'react-router-dom';
import { Scratch } from './components/scratch';
import GlobalErrModal from './components/globalerrmodal';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <Header />
            <GlobalErrModal />
            <Waitable>
              <Route exact path="/" component={() => <Auth />}/>        
              <Route path="/devhubs" component={() => <Auth />}/>
              <Route path="/scratch" component={() => <Scratch />} />
            </Waitable>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}