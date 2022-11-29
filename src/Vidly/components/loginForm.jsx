import React, { Component } from "react";
import Input from "../common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };
  //   username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleChange = ({ currentTarget: input }) => {
    const accountCopy = { ...this.state.account };
    accountCopy[input.name] = input.value;
    this.setState({ account: accountCopy });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // call the server
    // const username = this.username.current.value;
    console.log("submitted");
  };
  render() {
    return (
      <div>
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={this.state.account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={this.state.account.password}
            label="Password"
            onChange={this.handleChange}
          />
          {/* <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={this.state.account.username}
              autoFocus
              //   ref={this.username}
              onChange={this.handleChange}
              name="username"
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              className="form-control"
              value={this.state.account.password}
              onChange={this.handleChange}
            />
          </div> */}
          <button className="btn btn-primary">Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
