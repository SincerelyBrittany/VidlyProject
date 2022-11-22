import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 3,
    tags: ["tag1", "tag2", "tag3"],
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
    return (
      <>
        <h1 style={this.styles}> Counter Example </h1>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn brn-secondary btn-sm"> Increment </button>
        <ul>
          {this.state.tags.map((tag) => (
            <li>{tag}</li>
          ))}
        </ul>
      </>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
