import React, { Component } from "react";
import "../Components/css/LoopProject.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

class LoopProject extends Component {
  render() {
    // console.log(this.props.MainProject.Tododetails)
    if (this.props.token_access.name === this.props.MainProject.owner) {
      return (
        <>
          <div className="SelectProjects">
            <ButtonGroup
              size="large"
              color="secondary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={this.props.selectbtn.bind(
                  this,
                  this.props.MainProject._id
                )}
              >
                {this.props.MainProject.ProjectTitle}
              </Button>
              <Button
                onClick={this.props.Pdelbtn.bind(
                  this,
                  this.props.MainProject._id
                )}
                // onClick={this.props.delbtn.bind(this, this.props.MainProject._id)}
              >
                <HighlightOffIcon />
              </Button>
            </ButtonGroup>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default LoopProject;
