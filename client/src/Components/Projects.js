import React, { Component } from "react";

import ProjectItem from "./ProjectItem";

class Projects extends Component {
  render() {
    return this.props.projects.map((project, i) => {
      return (
        <ProjectItem
          key={i}
          projectItem={project}
          markCompleted={this.props.markCompleted}
          delbtn={this.props.delbtn}
          editbtn={this.props.editbtn}
          Current_project={this.props.Current_project}
          token_access={this.props.token_access}
        />
      );
    });
  }
}

export default Projects;
