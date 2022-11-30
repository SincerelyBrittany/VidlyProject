import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import Input from "../common/input";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),

    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          {/* <Input
            name="username"
            value={this.state.data.username}
            label="Username"
            onChange={this.handleChange}
            error={this.state.errors.username}
          /> */}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {/* <Input
            name="password"
            value={this.state.data.password}
            label="Password"
            onChange={this.handleChange}
            error={this.state.errors.password}
          /> */}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
