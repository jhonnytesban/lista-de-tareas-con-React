import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import Login from './components/Login';

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/inicio'>
            <Form />
          </Route>
        </Switch>
      </Router>
      {/* <Form /> */}
    </Fragment>  
  );
}

export default App;
