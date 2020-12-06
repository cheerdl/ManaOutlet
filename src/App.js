import './App.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import history from './history';
import Login from "./components/login";
import Second from './components/secondPage';
import branch1 from './components/branch1';
import branch2 from './components/branch2';
import branch3 from './components/branch3';
import allBranch from './components/allBranch';

function App() {
  return (<Router history ={history}>
    <div className="App">
    <Switch>
      <Route exact path='/' component ={Login} />
      <Route path='/login' component ={Login} />
      <Route path="/secondPage" component={Second} />
      <Route path="/ซีคอนบางแค" component={branch1} />
      <Route path="/เอสพลานาด" component={branch2} />
      <Route path="/อุดรธานี" component={branch3} />
      <Route path="/ผลรวมยอดขาย" component={allBranch} />
      </Switch>
</div>
</Router>


  );
}
export default App;
