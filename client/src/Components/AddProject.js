import React, { Component } from "react";
import "../Components/css/AddProject.css";
import TextField from "@material-ui/core/TextField";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.AddProject(this.state.title);
  };

  textChange = (e) => {
    // console.log('tetchng', e.target.value)
    if (e.target.value !== "") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      alert("Enter Text");
    }
  };

  render() {
    return (
      <div>
        <hr></hr>
        <p>ENTER NEW PROJECT</p>
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <br></br>
          <TextField
            id="outlined-basic"
            label="PROJECT"
            variant="outlined"
            name="title"
            placeholder="NAME"
            color="secondary"
            value={this.state.title}
            onChange={this.textChange}
          />

          {
            <button className="addProject" value={this.state.id}>
              <LibraryAddIcon /> Add Project
            </button>
          }
        </form>
      </div>
    );
  }
}

export default AddProject;
