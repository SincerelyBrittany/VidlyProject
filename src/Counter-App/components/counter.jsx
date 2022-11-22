import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 3,
  };

  formatCount() {
    const { count } = this.state;
    return count === 0 ? <h1>Zero</h1> : count;
  }

  styles = {
    fontSize: 50,
    fontWeight: "bold",
  };

  render() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return (
      <>
        <h1 style={this.styles}> Counter Example </h1>
        <span className={classes}>{this.formatCount()}</span>
        <button className="btn brn-secondary btn-sm"> Increment </button>
      </>
    );
  }
}

export default Counter;
