import React, { Component } from "react";
import IsProjectItem from "./IsProjectItem";

class IsCompleted extends Component {
  render() {
    return this.props.Projects_Completed.map((project, i) => {
      return (
        <IsProjectItem
          key={i}
          projectItem={project}
          delbtn={this.props.delbtn}
          Current_project={this.props.Current_project}
          checkCompleted={this.props.checkCompleted}
          token_access={this.props.token_access}
        />
      );
    });
  }
}

export default IsCompleted;
