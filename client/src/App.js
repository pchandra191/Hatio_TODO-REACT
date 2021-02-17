import React, { Component } from "react";
import axios from "axios";

import Projects from "./Components/Projects";
import "./Components/layout/Headers.css";
import Addlist from "./Components/Addlist";
import IsCompleted from "./Components/IsCompleted";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./Components/pages/About";
import "../src/App.css";
import AddProject from "./Components/AddProject";
import IsLoopProject from "./Components/IsLoopProject";

import GithubButton from "react-github-login-button";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class App extends Component {
  constructor() {
    super();
    this.state = {
      MainProject: [],
      Projects: [],
      Projects_Completed: [],
      Current_project: String,
      Project_title: [],
      IsLoggedIn: false,
      token_access: [],
    };
  }

  async componentDidMount() {
    await axios.get("http://localhost:5000/join").then((res) => {
      res.data.forEach((element) => {
        // console.log(element)

        this.setState({
          MainProject: [...this.state.MainProject, element],
        });
        //console.log(this.state.MainProject)

        if (element.isCompleted === false) {
          //    console.log(element);
          this.setState({ Projects: [...this.state.Projects, element] });
        } else {
          // console.log (element);
          this.setState({
            Projects_Completed: [...this.state.Projects_Completed, element],
          });
        }
      });
    });

    const str = window.location.href;
    var res = {
      token: str.slice(29, 69),
      name: str.slice(75),
    };
    // console.log(res)
    this.setState({ token_access: res });

    await axios.get("http://localhost:5000/projectsall").then((res) => {
      res.data.forEach((element) => {
        //    console.log(element)

        this.setState({
          Project_title: [...this.state.Project_title, element],
        });
      });
    });

    console.log(this.state.token_access.token);
    if (
      this.state.token_access.token.length >= 40 &&
      this.state.token_access.token.length <= 40
    ) {
      this.setState({ IsLoggedIn: true });
    }
  }

  //Project Selection
  selectbtn = (id) => {
    this.setState({ Current_project: id });
    this.s();
  };
  s = () => {
    console.log(this.state.Current_project);
  };

  //ADD New todo
  Addlist = (title) => {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 26; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const data = {
      _id: result,
      title: title,
      owner: this.state.token_access.name,
      p_id: this.state.Current_project,
      isCompleted: false,
    };
    if (title != null) {
      axios({
        method: "post",
        url: "http://localhost:5000/posts",
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          alert("NEW TODO ADDED", response);
        })
        .catch(function (response) {
          console.log("ERROR", response);
        });
    }
    this.setState({ MainProject: [...this.state.MainProject, data] });
    console.log(this.state.MainProject);
    
  };

  //ADD PROJECT
  AddProject = (title) => {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 26; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const data = {
      _id: result,
      ProjectTitle: title,
      owner: this.state.token_access.name,
    };
    if (title != null) {
      axios({
        method: "post",
        url: "http://localhost:5000/projects",
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          alert("New Project Added", response);
        })
        .catch(function (response) {
          console.log("ERROR", response);
        });
    }

    this.setState({
      Project_title: [...this.state.Project_title, data],
    });
  };

  //Delete Project
  Pdelbtn = async (id) => {
    console.log("clicked De", id);
    console.log(this.state.Project_title);

    this.setState({
      Project_title: this.state.Project_title.filter((project) => {
        console.log(project);
        return project._id !== id;
      }),
    });

    const data = {
      _id: id,
    };
    await axios({
      method: "delete",
      url: `http://localhost:5000/projectdelete/${id}`,
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        alert(`Project Deleted`, response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  //CheckBox
  markCompleted = (id) => {
    this.setState({
      Projects: this.state.MainProject.map((project) => {
        if (project._id === id) {
          project.isCompleted = !project.isCompleted;
          console.log(project.isCompleted);
          this.setState({
            Projects_Completed: [...this.state.Projects_Completed, project],
          });

          const data = {
            isCompleted: true,
          };
          axios({
            method: "put",
            url: `http://localhost:5000/posts/${id}`,
            data: data,
            headers: {
              "Content-Type": "application/json",
              Connection: "Keep-alive",
            },
          })
            .then(function (response) {
              alert("Congrats!!! Todo Got Completed", response);
            })
            .catch(function (response) {
              console.log(response);
            });
        }

        return project;
      }),
    });
    this.filterAdd(id);
  };

  filterAdd = (id) => {
    this.setState({
      Projects: this.state.Projects.filter((project) => {
        return project._id !== id;
      }),
    });
  };

  //Delete
  delbtn = (id) => {
    const data = {
      _id: id,
    };
    axios({
      method: "delete",
      url: `http://localhost:5000/posts/${id}`,
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        alert("You deleted the TODO", response);
      })
      .catch(function (response) {
        console.log(response);
      });

    this.setState({
      MainProject: this.state.MainProject.filter((project) => {
        return project._id !== id;
      }),
    });
  };

  //Edit
  editbtn = async (title, id) => {
    console.log(id);

    this.setState({
      Projects: this.state.MainProject.map((project) => {
        if (project._id === id) {
          project.title = title;
          console.log(project.isCompleted);
          this.setState({
            Projects_Completed: [...this.state.Projects_Completed, project],
          });
        }
      }),
    });

    if (title !== null) {
      const data = {
        title: title,
      };

      axios({
        method: "put",
        url: `http://localhost:5000/posts/${id}`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Connection: "Keep-alive",
        },
      })
        .then(function (response) {
          alert("TODO MODIFIED", response);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
    alert("Successfully Uploaded to GIST GITHUB");
  };

  gistCreate = async () => {
    axios.get("http://localhost:5000/posts").then((res) => {
      let datatosend_true = "";
      let datatosend_false = "";
      let Project_t = "";
      let length_total = 0;
      let length_pend = 0;

      res.data.forEach((element) => {
        //  console.log(element.title)
        if (element.p_id === this.state.Current_project) {
          this.state.Project_title.map((project, i) => {
            if (project._id === this.state.Current_project) {
              Project_t = project.ProjectTitle;
            }
            return null;
          });
          length_total += 1;
          if (element.isCompleted === true) {
            length_pend += 1;
            datatosend_true += `- [x] : ${element.title} \n`;
          }
          if (element.isCompleted === false) {
            datatosend_false += `- [ ] : ${element.title} \n`;
          }
        }
      });
      let token = this.state.token_access.token;

      const data = {
        token: token,
        content_t: datatosend_true,
        content_f: datatosend_false,
        project_title: Project_t,
        length_total: length_total,
        length_pend: length_pend,
      };

      console.log(data.content_f);
      axios({
        method: "post",
        url: "http://localhost:5000/postsgistCreate",
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          alert("GIST UPLOADED", response);
        })
        .catch(function (response) {
          console.log("ERROR", response);
        });
    });
  };

  //LOGOUT
  logoutbtn = () => {
    let res = { token: "", name: "" };
    this.setState({ token_access: res });
    console.log(this.state.token_access);
  };

  render() {
    if (this.state.IsLoggedIn === true) {
      return (
        <Router>
          <div className="Container bg">
            <div class="nav">
              <div class="nav-header">
                <div class="nav-title">TODO LIST APPLICATION</div>
              </div>

              <div class="nav-links">
                <p className="AfterLogged">
                  <form onSubmit={this.logoutbtn}>
                    <br></br>
                    <button className="addProject" onClick={this.logoutbtn}>
                      <ExitToAppIcon />
                      LOGOUT
                    </button>
                  </form>
                </p>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div class="nav-links"></div>
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <br></br>
                  <br></br>
                  <div className="ShowProjects">
                    <IsLoopProject
                      MainProject={this.state.Project_title}
                      selectbtn={this.selectbtn}
                      Pdelbtn={this.Pdelbtn}
                      token_access={this.state.token_access}
                    />
                  </div>
                  <div className="AddProject">
                    <AddProject AddProject={this.AddProject} />
                  </div>

                  <div className="AddTodo">
                    <Addlist Addlist={this.Addlist} />
                    <br></br>
                  </div>

                  <div
                    className="UploadGist"
                    style={{ float: "right", padding: "20px 20px" }}
                  >
                    <Button
                      border={1}
                      onClick={this.gistCreate}
                      color="secondary"
                      size="large"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload To GIST
                    </Button>
                  </div>

                  <div className="ShowPending">
                    <p>Pending : </p>
                    <Projects
                      projects={this.state.MainProject}
                      markCompleted={this.markCompleted}
                      delbtn={this.delbtn}
                      editbtn={this.editbtn}
                      Current_project={this.state.Current_project}
                      token_access={this.state.token_access}
                    />
                  </div>
                  <br></br>
                  <hr></hr>
                  <div className="ShowCompleted">
                    <p>Completed : </p>

                    <IsCompleted
                      Projects_Completed={this.state.MainProject}
                      delbtn={this.delbtn}
                      checkCompleted={this.checkCompleted}
                      Current_project={this.state.Current_project}
                      token_access={this.state.token_access}
                    />
                  </div>
                </React.Fragment>
              )}
            />
            <Route path="/About" component={About} />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="Container bg else">
            <h1>LOGIN INTO GITHUB TO CONTINUE AND SEE YOUR TODOS</h1>
            <div class="nav-header">
              <p className="AfterLogged">
                <a href="http://localhost:5000/github">
                  <GithubButton />
                </a>
              </p>
            </div>
          </div>
        </Router>
      );
    }
  }
}

export default App;
