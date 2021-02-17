import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import postGit from "./routes/postsgit.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://hatio:hatio123@cluster0.wzay9.mongodb.net/hatio?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

//Init Mongo
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", true);
app.use("/", postRoutes);
app.use("/", postGit);

//app.listen(3000);
