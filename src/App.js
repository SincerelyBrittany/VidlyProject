import React from "react";
import "./App.css";

import Counters from "./Counter-App/components/counters";
import Vidly from "./Vidly/components/vidly";
import Navbar from "./Navbar/navbar";

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

  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Counters
          counters={counters}
          onReset={handleReset}
          onDelete={handleDelete}
          onIncrement={handleIncrement}
        />
        {/* <Vidly /> */}
      </main>
    </div>
  );
}

export default App;
