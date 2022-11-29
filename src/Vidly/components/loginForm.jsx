import React, { Component } from "react";
import Input from "../common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const accountCopy = { ...this.state.account };
    accountCopy[input.name] = input.value;
    this.setState({ account: accountCopy });
  };

  validate = () => {
    const errors = {};
    if (this.state.account.username.trim() === "")
      errors.username = "Username is required";
    if (this.state.account.password.trim() === "")
      errors.password = "Password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
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
            error={this.state.errors.username}
          />
          <Input
            name="password"
            value={this.state.account.password}
            label="Password"
            onChange={this.handleChange}
            error={this.state.errors.password}
          />

          <button className="btn btn-primary">Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
