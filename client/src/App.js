import React from "react";
import "./App.css";
import { setAuthToken } from "./Utils/API";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Check for token
if (localStorage.getItem("jwtToken")) {
  // Set auth token header auth for API
  setAuthToken(localStorage.getItem("jwtToken"));
}

class App extends Component() {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem("jwtToken"),
      redirect: false,
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            {!this.state.isLoggedIn ? (
              <div>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Login
                      {...props}
                      handleLogin={() => this.handleLogin}
                      handleInputChange={() => this.handleInputChange}
                    />
                  )}
                />
                <Redirect from="/" to="/" />
              </div>
            ) : (
              <div>
                <Route exact path="/" component={Dashboard} />
              </div>
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
