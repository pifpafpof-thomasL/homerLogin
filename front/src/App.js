import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignInUp from './SignInUp';
import Profile from './Profile';


class App extends Component {
  constructor(props) {
    super(props);

    localStorage.setItem("profile",
    JSON.stringify({
        email: "",
        pseudo: "",
    }));
  };

  render() {
    return (
      <BrowserRouter >
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <Switch>
                <Route path="/birds" component={Profile} />
                <Route path="/" component={SignInUp} />
              </Switch>
              <br/>
              <Link to="/">Home</Link>
              <br/>
              <Link to="/birds">Profile</Link>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
