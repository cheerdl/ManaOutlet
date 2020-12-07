import './App.css'
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Scripts
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'

import history from './history'
import Login from "./components/login"
import Second from './components/secondPage'

function App() {
  return (
    <Router history ={history}>
      <div className="App">
        <Switch>
          <Route exact path='/' component ={Login} />
          <Route path='/login' component ={Login} />
          <Route path="/pages" component={Second} />
        </Switch>
      </div>
    </Router>
  )
}
export default App
