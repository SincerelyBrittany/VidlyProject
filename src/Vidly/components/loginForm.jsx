import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };
  //   username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleChange = (e) => {
    const accountCopy = { ...this.state.account };
    accountCopy.username = e.currentTarget.value;
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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={this.state.account.username}
              autoFocus
              //   ref={this.username}
              onChange={this.handleChange}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
