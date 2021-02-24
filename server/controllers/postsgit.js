import postsgit from "../models/gitMessage.js";
import axios from "axios";
import { Octokit } from "@octokit/core";
import Projects from "../models/postMessage.js";

export const gistInfo = async (req, res) => {
  try {
    const octokit = new Octokit({
      auth: " pass token here ",
    });
    const getInfo = await octokit.request("/gists");
    console.log("info", getInfo);
    res.status(200).json(getInfo);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

//Create New Gist
export const gistCreate = async (req, res) => {
  console.log(req.body.token);
  let summary = "Summary:";
  let pend = "Pending";
  let comp = "Completed";
  let token = req.body.token;
  try {
    const data = {
      public: false,
      description: "Todo - Hatio",
      files: {
        "Todo.md": {
          content: `<h2>${req.body.project_title}</h2> \n <h4>${summary}</h4> ${req.body.length_pend}/${req.body.length_total} todos Completed  \n <h3>${pend}</h3> 
          \n ${req.body.content_f} \n <h3>${comp}</h3> 
          \n ${req.body.content_t}`,
        },
      },
    };
    console.log(data);
    axios({
      method: "post",
      url: `https://api.github.com/gists`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
    })
      .then(function (response) {
        console.log("ADD", response);
      })
      .catch(function (response) {
        console.log("ERROR", response);
      });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//GET ONE Git
export const getGitById = async (req, res, next) => {
  console.log("Get One Git");
  try {
    const getMessage = await postsgit.findById(req.params.id);
    res.status(200).json(getMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
  next();
};

//GET ALL GitHub
export const getGit = async (req, res) => {
  // console.log("Get All Git", a);
  try {
    const postMessage = await postsgit.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//DELETE ONE
export const gitdeletePost = async (req, res) => {
  console.log("delete");
  try {
    const getMessage = await postsgit.findById(req.params.id);
    const deleteMessage = await getMessage.delete();
    res.status(200).json(deleteMessage);
  } catch (error) {
    res.status(400).json("ID NOT FOUND", error.message);
  }
};

//OAuth Step
export const githubLogin = async (req, res, next) => {
  //GitHub OAuth
  console.log("oauth");
  const clientId = "e8c7b00d40dddc513d97";
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist user`
  );
  next();
};

// //OAuth for futher requests
//
// var a = [];
// export const githubLoginRDT = async (req, res, next) => {
//   //GitHub OAuth
//   //  const clientId = "e8c7b00d40dddc513d97";

//   console.log("redirecting", req.query.code);
//    a += req.query.code
//    //b = req.query.code

//    res.redirect(`http://localhost:3000`);
//   //res.redirect(`http://localhost:5000/oauth-callback?code=${req.query.code}`);
//   next();
// };

//Update One
export const updateStatus = async (req, res, next) => {
  console.log(req.body.status);
  try {
    const getId = postsgit.findById(req.params.id);
    const updatedS = await postsgit.findOneAndUpdate(getId, {
      status: `${req.body.status}`,
    });
    res.status(200).json(updatedS);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
  res.redirect("http://localhost:3000/");

  next();
};

//JOIN
export const Join = async (req, res) => {
  // console.log("Get All Git");
  try {
    const postMessage = await Projects.findById(req.params.id);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const githubDataValidation = (req, res, next) => {
  console.log("q", req.query.token);
  const requestToken = req.query.token;

  try {
    let u_name = "";
    axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        Authorization: "token " + requestToken,
      },
    }).then((response) => {
      console.log({ userData: response.data.login });

      res.redirect(
        `http://localhost:3000?token=${requestToken}&name=${response.data.login}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
