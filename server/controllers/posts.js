import posts, { Projects } from "../models/postMessage.js";

//GET ALL
export const getPosts = async (req, res) => {
  try {
    const postMessage = await posts.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//ADD
export const createPost = async (req, res, next) => {
  console.log(req.body.p_id);

  const newPosts = new posts({
    _id: req.body._id,
    title: req.body.title,
    p_id: req.body.p_id,
    owner: req.body.owner,
  });
  try {
    const newTodo = await newPosts.save(newPosts);
    res.status(200).json({ newTodo });
    alert("Sucess Project");
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

//ADD Projects
export const createProject = async (req, res, next) => {
  console.log(req.body._id);

  const newPosts = new Projects({
    _id: req.body._id,
    ProjectTitle: req.body.ProjectTitle,
    owner: req.body.owner,
  });
  try {
    const newTodo = await newPosts.save(newPosts);
    res.status(200).json({ newTodo });
    console.log("Sucess Project");
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

//PROJECTSTITLE GET ALL
export const getProjects = async (req, res) => {
  try {
    const postMessage = await Projects.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//GET ONE
export const getPostById = async (req, res) => {
  try {
    const getMessage = await posts.findById(req.params.id);
    res.status(200).json(getMessage);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//DELETE ONE
export const deletePost = async (req, res) => {
  console.log(req.params.id);
  try {
    const getMessage = await posts.findById(req.params.id);
    const deleteMessage = await getMessage.delete();
    res.status(200).json(deleteMessage);
  } catch (error) {
    res.status(400).json("ID NOT FOUND", error.message);
  }
};

//UPDATE ONE
export const updatePost = async (req, res) => {
  console.log("Title", req.body.title);
  if (req.body.title != undefined) {
    try {
      const getId = posts.findById(req.params.id);
      const updatedTodo = await posts.findOneAndUpdate(getId, {
        title: `${req.body.title}`,
      });
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
  if (req.body.isCompleted == true) {
    console.log(req.body.isCompleted);
    try {
      const getId = posts.findById(req.params.id);
      const updatedTodo = await posts.findOneAndUpdate(getId, {
        isCompleted: `${req.body.isCompleted}`,
      });
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  }
};

//Delete Project
export const projectDelete = async (req, res) => {
  console.log("p", req.params.id);
  try {
    const getMessage = await Projects.findById(req.params.id);

    const deleteMessage = await getMessage.delete();
    res.status(200).json(deleteMessage);
  } catch (error) {
    console.log(error);
  }
};

//lookUp JOIN
export const joinById = async (req, res) => {
  //console.log(req.body.posts_id);
  try {
    const lookUp = await posts.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "p_id",
          foreignField: "_id",
          as: "Tododetails",
        },
      },
    ]);
    res.status(200).json(lookUp);
  } catch (error) {
    res.status(400).json(error);
  }
};
