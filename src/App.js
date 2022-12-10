import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import Counters from "./Counter-App/components/counters";
import Vidly from "./Vidly/components/vidly";
import Navbar from "./Navbar/navbar";
import Customers from "./Vidly/components/customers";
import Rentals from "./Vidly/components/rentals";
import NotFound from "./Vidly/components/notFound";
import MovieForm from "./Vidly/components/movieForm";
import LoginForm from "./Vidly/components/loginForm";
import Logout from "./Vidly/components/logout";
import RegistrationForm from "./Vidly/components/registrationForm";
import ProtectRoute from "./Vidly/common/protectRoute";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    counters: [
      {
        id: 1,
        value: 4,
      },
      {
        id: 2,
        value: 0,
      },
      {
        id: 3,
        value: 0,
      },
      {
        id: 4,
        value: 0,
      },
    ],
    errors: {},
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }

  handleDelete = async (counterId) => {
    const countersCopy = await this.state.counters.filter(
      (c) => c.id !== counterId
    );

    this.setState({
      counters: countersCopy,
    });
  };

  handleReset = async () => {
    const countersCopy = await this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });

    this.setState({
      counters: countersCopy,
    });
  };

  handleIncrement = async (counter) => {
    const countersCopy = [...this.state.counters];
    const index = countersCopy.indexOf(counter);
    countersCopy[index] = { ...counter };
    countersCopy[index].value++;
    this.setState({
      counters: countersCopy,
    });
  };

  handleDecrement = async (counter) => {
    const countersCopy = await [...this.state.counters];
    const index = countersCopy.indexOf(counter);
    countersCopy[index] = { ...counter };
    countersCopy[index].value--;
    this.setState({
      counters: countersCopy,
    });
  };

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <ToastContainer />
          <Navbar user={this.state.user} />
          <main className="container">
            <Switch>
              <ProtectRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={(props) => <Vidly {...props} user={this.state.user} />}
              />
              <Route
                path="/counters"
                render={(props) => (
                  <Counters
                    {...props}
                    counters={this.state.counters}
                    onReset={this.handleReset}
                    onDelete={this.handleDelete}
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                  />
                )}
              ></Route>
              <Route path="/customers" component={Customers}></Route>
              <Route path="/login" component={LoginForm}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/signup" component={RegistrationForm}></Route>
              <Route path="/rentals" component={Rentals}></Route>
              <Route path="/not-found" component={NotFound}></Route>
              <Redirect from="/" exact to="movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
