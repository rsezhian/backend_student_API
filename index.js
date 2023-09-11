//
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const student = require("./schemas/student.jsx");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({
    origin: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://abcd:abcd@cluster0.57fajnv.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to MongoDB !!!");
  })
  .catch((err) => console.log("SERVER not connected !!!"));

// add a particular student
app.post("/addstudent", (req, res) => {
  const studentts = new student({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    age: req.body.age,
  });
  studentts
    .save()
    .then(() => res.send("successfully added the student record"))
    .catch((err) => res.send("error adding the student record"));
});

//get a particular student
app.get("/getstudent/:id", (req, res) => {
  let id = req.params.id;
  student
    .findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get all students records
app.get("/getallstudents", (req, res) => {
  student
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// delete a particular student
app.delete("/deletestudent/:id", (req, res) => {
  let id = req.params.id;
  student
    .findByIdAndDelete(id)
    .then(() => res.send("deleted a particular student"))
    .catch((err) => res.send(err));
});

//update a particular student
app.put("/updatestudent/:id", (req, res) => {
  let id = req.params.id;
  let { name, email, gender, age } = req.body;
  let update_record = {};
  if (name) {
    update_record.name = name;
  }
  if (email) {
    update_record.email = email;
  }
  if (gender) {
    update_record.gender = gender;
  }
  if (age) {
    update_record.age = age;
  }
  student
    .findByIdAndUpdate(id, { $set: update_record })
    .then(() => res.send("sucessfully particular record updated"))
    .catch((err) => res.send("error while updating !!!"));
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
app.listen(process.env.PORT, () => {
  console.log("SERVER listening on PORT", process.env.PORT);
});
