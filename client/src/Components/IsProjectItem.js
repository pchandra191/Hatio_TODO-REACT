import React, { Component } from "react";

import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

class IsProjectsItem extends Component {
 
  render() {
    if (
      this.props.Current_project === this.props.projectItem.p_id &&
      this.props.projectItem.isCompleted === true && this.props.token_access.name === this.props.projectItem.owner
    ) {
      //Completed
      return (
        <>
          <div>
            <h2>
              
              <input type="checkbox" defaultChecked />
              {this.props.projectItem.title}
              <button
                onClick={this.props.delbtn.bind(
                  this,
                  this.props.projectItem._id
                )}
                style={btnStyle}
              >
                <DeleteForeverTwoToneIcon />
              </button>
            </h2>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}


const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 8px",
  borderRadius: "40%",
  cursor: "pointer",
  float: "right",
};

export default IsProjectsItem;
