import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Counters from "./Counter-App/components/counters";
import Vidly from "./Vidly/components/vidly";
import Navbar from "./Navbar/navbar";
import Customers from "./Vidly/components/customers";
import Rentals from "./Vidly/components/rentals";
import NotFound from "./Vidly/components/notFound";

import "./App.css";
import MovieForm from "./Vidly/components/movieForm";
import LoginForm from "./Vidly/components/loginForm";

function App() {
  const [counters, setCounters] = React.useState([
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
  ]);

  const handleDelete = async (counterId) => {
    const countersCopy = await counters.filter((c) => c.id !== counterId);
    setCounters(countersCopy);
  };

  const handleReset = async () => {
    const countersCopy = await counters.map((c) => {
      c.value = 0;
      return c;
    });
    setCounters(countersCopy);
  };

  const handleIncrement = async (counter) => {
    const countersCopy = await [...counters];
    const index = countersCopy.indexOf(counter);
    countersCopy[index] = { ...counter };
    countersCopy[index].value++;
    setCounters(countersCopy);
  };

  const handleDecrement = async (counter) => {
    const countersCopy = await [...counters];
    const index = countersCopy.indexOf(counter);
    countersCopy[index] = { ...counter };
    countersCopy[index].value--;
    setCounters(countersCopy);
  };

  console.warn = () => {};
  return (
    <div className="App">
      {/* <Navbar totalCounters={counters.filter((c) => c.value > 0).length} /> */}
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Vidly}></Route>
          <Route
            path="/counters"
            render={(props) => (
              <Counters
                {...props}
                counters={counters}
                onReset={handleReset}
                onDelete={handleDelete}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            )}
          ></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="movies" />
          <Redirect to="/not-found" />
          {/* <Counters
          counters={counters}
          onReset={handleReset}
          onDelete={handleDelete}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        /> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;
