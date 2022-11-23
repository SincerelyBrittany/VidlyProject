# Counter

Steps taken to get to final result

```
import React, { Component } from "react";

class Counter extends Component {

    constructor() {
      super();
      this.handleIncrement.bind(this);
    }

  handleIncrement() {
      console.log("increment clicked");
    }
  state = {
    count: 3,
    tags: [],
  };

  formatCount() {
    const { count } = this.state;
    return count === 0 ? <h1>Zero</h1> : count;
  }

  styles = {
    fontSize: 50,
    fontWeight: "bold",
  };

  renderTags() {
    if (this.state.tags.length === 0) return <p> There are no tags </p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <>
        <h1 style={this.styles}> Counter Example </h1>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn brn-secondary btn-sm"
        >
          Increment
        </button>
        {this.renderTags()}
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
```

# Next Update:

import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value,
    tags: [],
  };

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  formatCount() {
    const { count } = this.state;
    return count === 0 ? <h1>Zero</h1> : count;
  }

  renderTags() {
    // if (this.state.tags.length === 0) return <p> There are no tags </p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  render() {
    console.log(this.props, "this is props");
    return (
      <>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn brn-secondary btn-sm"
        >
          Increment
        </button>
        {this.renderTags()}
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

# Before removing state and maing it a controlled component

import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.counter.value,
    tags: [],
  };

  handleIncrement = () => {
    this.setState({
      value: this.state.value + 1,
    });
  };

  formatCount() {
    const { value } = this.state;
    return value === 0 ? <h1>Zero</h1> : value;
  }

  renderTags() {
    // if (this.state.tags.length === 0) return <p> There are no tags </p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn sm m-2"
        >
          {" "}
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
