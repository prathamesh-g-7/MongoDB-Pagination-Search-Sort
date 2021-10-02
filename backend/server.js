import express from "express";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { wrokshopTwelveUsers } from "./userModel.js";

const app = express();
app.use(express.json());

// DB config
const mongoURI =
  "mongodb+srv://admin:AtHaoRroNldFmHr7@cluster0.ghi5h.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

// routes

app.post("/create-user", (req, res) => {
  const details = req.body;

  wrokshopTwelveUsers.insertMany(details, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/users/:username", (req, res) => {
  try {
    var regex = new RegExp(req.params.username, "i");
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 3;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    wrokshopTwelveUsers
      .find({ username: regex }, (error, data) => {
        if (error) {
          console.log("find method error---->", error);
        } else {
          console.table(data);
          res.send(data);
        }
      })
      .sort({ username: 1 })
      .limit(limit)
      .skip(skip);
  } catch (error) {
    console.log(error);
  }
});

// listen
app.listen(3200);
