import React, { Component } from "react";

import LoopProject from "./LoopProject";

class IsLoopProject extends Component {
  render() {
    return this.props.MainProject.map((project, i) => {
      return (
        <LoopProject
          key={i}
          MainProject={project}
          selectbtn={this.props.selectbtn}
          Pdelbtn={this.props.Pdelbtn}
          token_access={this.props.token_access}
        />
      );
    });
  }
}

export default IsLoopProject;
