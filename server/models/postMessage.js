import mongoose from "mongoose";
const { Schema } = mongoose;
//schema mongoose
const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000,
    //IST
  },

  p_id: { type: String, ref: "Projects" },

  owner: { type: String, ref: "postsgit" },
});

const ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  ProjectTitle: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000,
    //IST
  },

  posts_id: { type: String, ref: "Posts" },
  owner: { type: String, ref: "postsgit" },
});

const Posts = mongoose.model("Posts", postSchema);

export const Projects = mongoose.model("Projects", ProjectSchema);
// export common  Projects;
export default Posts;
//module.exports  = mongoose.model('posts', postSchema)
