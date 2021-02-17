import React, { Component } from "react";
import "../Components/css/AddProject.css";
import TextField from "@material-ui/core/TextField";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

class Addlist extends Component {
  constructor() {
    super();
    this.state = {
      title: String,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.Addlist(this.state.title);
    this.setState({ title: "" });
  };

  textChange = (e) => {
    // console.log('tetchng', e.target.value)
    if (e.target.value !== "") {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    return (
      <div>
        <p>ENTER NEW TODO TASK</p>
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <br></br>

          <TextField
            id="outlined-basic"
            label="TODO TAKS"
            variant="outlined"
            name="title"
            placeholder="NAME"
            value={this.state.title}
            onChange={this.textChange}
          />
          <button className="addProject" value={this.state.id}>
            <PlaylistAddCheckIcon /> Add TODO
          </button>
        </form>
      </div>
    );
  }
}

export default Addlist;
