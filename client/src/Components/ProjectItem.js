import React, { Component } from "react";

import PropTypes from "prop-types";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { Button } from "@material-ui/core";

class ProjectsItem extends Component {
  constructor() {
    super();
    this.state = {
      updtitle: "",
      show: false,
    };
  }

  showEdit = () => {
    this.setState({
      show: (this.state.show = !this.state.show),
    });
  };

  textChange = (e) => {
    // console.log('tetchng', e.target.value)
    if (e.target.value !== " ") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      alert("Enter Text");
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editbtn(this.state.updtitle, this.props.projectItem._id);
  };

  render() {
    //console.log(this.props.token_access.name)
    if (
      this.props.Current_project === this.props.projectItem.p_id &&
      this.props.projectItem.isCompleted === false &&
      this.props.token_access.name === this.props.projectItem.owner
    ) {
      //Pending
      return (
        <>
          <div>
            <p>
              <input
                type="checkbox"
                onChange={this.props.markCompleted.bind(
                  this,
                  this.props.projectItem._id
                )}
              />

              {this.props.projectItem.title}

              <Button onClick={this.showEdit}>
                <EditIcon />
              </Button>
              {this.state.show ? (
                <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
                  <br></br>
                  <input
                    type="text"
                    name="updtitle"
                    placeholder="Change Title"
                    value={this.state.updtitle}
                    onChange={this.textChange}
                  />
                  <button  >
                    <EditIcon onClick={this.showEdit} /> Edit
                  </button>
                </form>
              ) : null}
              <button
                onClick={this.props.delbtn.bind(
                  this,
                  this.props.projectItem._id
                )}
                style={btnStyle}
              >
                <DeleteForeverTwoToneIcon />
              </button>
            </p>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

ProjectsItem.propTypes = {
  projectItem: PropTypes.object.isRequired,
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 8px",
  borderRadius: "40%",
  cursor: "pointer",
  float: "right",
};

export default ProjectsItem;
