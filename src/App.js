import './App.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// Scripts
// import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import history from './history';
import Login from "./components/login";
import Second from './components/secondPage';

function App() {
  return (<Router history ={history}>
    <div className="App">
    <Switch>
      <Route exact path='/' component ={Login} />
      <Route path='/login' component ={Login} />
      <Route path="/pages" component={Second} />
    </Switch>
</div>
</Router>


  );
}
export default App;
