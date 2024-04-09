import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/myapp");


mongoose.connect("mongodb://127.0.0.1:27017/sma").then(
  () => {
    console.log("Connected to Db")
  },
  (err) => {
    console.log(err)
  }
);