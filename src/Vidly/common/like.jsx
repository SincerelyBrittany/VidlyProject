import React, { Component } from "react";

export default class extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <div>
        <i
          onClick={this.props.onLiked}
          className={classes}
          aria-hidden="true"
          style={{ cursor: "pointer" }}
        ></i>
      </div>
    );
  }
}
