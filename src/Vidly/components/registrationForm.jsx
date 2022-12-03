import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
// import { Register } from "../services/userService";
import * as userService from "../services/userService";

class RegistrationForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password").min(3).max(30),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    await userService.register(this.state.data);
  };

  render() {
    return (
      <div>
        <h1> Registration </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
