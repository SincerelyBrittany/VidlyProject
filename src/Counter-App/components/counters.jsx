import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  styles = {
    fontSize: 50,
    fontWeight: "bold",
  };

  render() {
    return (
      <div>
        <h1 style={this.styles}> Counter Example </h1>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onReset}
        >
          Reset{" "}
        </button>
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            onDelete={this.props.onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
