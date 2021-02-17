import mongoose from "mongoose";

//schema mongoose
var gitSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 5.5 * 60 * 60 * 1000,
  },
});

var postsgit = mongoose.model("postsgit", gitSchema);
export default postsgit;
