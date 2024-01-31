//todo: REST-API (Representational State Transfer - Application Programming Interface)

const express = require("express");
require("../../src/db/conn"); //? This will require the connection file of the db
const menRaking = require("../../src/models/mans"); //? Import the Models of the man

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

//! Handle Get Method - This for test to check the connection properly set or not
// app.get("/", async (req, res) => {
//   res.send("Hello From the Server!");
// });

//! Handle Post Method - This method through user can enter the data or pass the data to the database using postman
app.post("/mens", async (req, res) => {
  try {
    const addingMensRecords = new menRaking(req.body); //? Create a new instance from our model and pass the
    console.log(req.body);
    const mensRecords = await addingMensRecords.save(); //? This will method will be used store the data to the database
    res.status(201).send(mensRecords); //? HTTP Status Code 201 Means Created
  } catch (error) {
    res.status(400).send(error); //? HTTP Status Code 400 Means Bad Request error
  }
});

//! Handle Get Method - We need to read the data (GetbyAll)
app.get("/mens", async (req, res) => {
  try {
    const mensRecords = await menRaking.find({});
    res.status(201).send(mensRecords); //? HTTP Status Code 201 Means Created
  } catch (error) {
    res.status(400).send(error); //? HTTP Status Code 400 Means Bad Request error
  }
});

//! Handle Get Method - We need to read the data (GetByID)
app.get("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const mensRecords = await menRaking.findById(_id);
    res.status(201).send(mensRecords); //? HTTP Status Code 201 Means Created
  } catch (error) {
    res.status(400).send(error); //? HTTP Status Code 400 Means Bad Request error
  }
});

//! Handle Patch Method - We need to update the data (UpdateByID)
app.patch("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const mensRecords = await menRaking.findByIdAndUpdate(_id, req.body, {
      //? If you pass this third option this will get you the updated data to the output
      new: true,
    });
    res.send(mensRecords); //? HTTP Status Code 201 Means Created
  } catch (error) {
    res.status(500).send(error); //? HTTP Status Code 500 Means Server Related Error
  }
});

//! Handle Delete Method - We need to delete the data (DeleteByID)
app.delete("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const mensRecords = await menRaking.findByIdAndDelete(_id);
    res.send(mensRecords); //? HTTP Status Code 201 Means Created
  } catch (error) {
    res.status(500).send(error); //? HTTP Status Code 500 Means Server Related Error
  }
});

app.listen(port, () => {
  console.log("Server Started on 3000 Port.");
});
