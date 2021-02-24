import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import {
  gistCreate,
  githubLogin,
  getGit,
  getGitById,
  gistInfo,
  updateStatus,
  gitdeletePost,
  githubDataValidation,
} from "../controllers/postsgit.js";

const router = express.Router();
var jsonParser = bodyParser.json();

router.get("/github", githubLogin);
router.get("/oauth-callback", githubValidation);
router.get("/data-callback", githubDataValidation);

router.get("/postsgitall", jsonParser, getGit);
router.get("/gistInfo", jsonParser, gistInfo);
router.post("/postsgistCreate", jsonParser, gistCreate);

router.get("/postsgit/:id", getGitById);
router.put("/postsgit/:id", jsonParser, updateStatus);

router.delete("/postsgitDelete/:id", jsonParser, gitdeletePost);

async function githubValidation(req, res, next) {
  const clientId = "get from github";
  const requestToken = req.query.code;
  let token = "";
  const clientSecret = "get from github";

  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code,
  };

  const opts = { headers: { accept: "application/json" } };

  axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${requestToken}`,
      body,
      opts
    )
    .then((res) => res.data["access_token"])
    .then((_token) => {
      token = _token;

      console.log("My token", token);
      console.log("Req_token", req.query.code); //10 validity

      //;
    })

    .catch((err) => res.json({ message: err.message }));
  //console.log("final n", token);
  setTimeout(function () {
    console.log("final T", token);
    res.redirect(`http://localhost:5000/data-callback?token=${token}`);
  }, 1000);
}

export default router;
