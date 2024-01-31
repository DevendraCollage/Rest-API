const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/olympics"
    //? If not pass this object this will give the deprecation error
    // { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    //? This will promise if connection is successful or not.
    console.log("Connected to MongoDB!");
  })
  .catch((e) => {
    console.log("Not Connection Successful!");
  });
