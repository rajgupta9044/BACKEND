const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");
const validateUser = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

/* REGISTER */
app.post("/register", async (req, res) => {
  try {

    validateUser(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.send("User Registered Successfully");

  } catch (err) {
    res.send("Error " + err.message);
  }
});


/* LOGIN */
app.post("/login", async (req, res) => {
  try {

    const people = await User.findOne({ email: req.body.email });

    if (!people) {
      throw new Error("User not found");
    }

    const isAllowed = await bcrypt.compare(req.body.password, people.password);

    if (!isAllowed) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { _id: people._id, email: people.email },
      "rohit@123"
    );

    res.cookie("token", token);

    res.send("Login Successfully");

  } catch (err) {
    res.send("Error " + err.message);
  }
});


/* GET ALL USERS */
app.get("/register", async (req, res) => {
  try {
    const info = await User.find({});
    res.send(info);
  } catch (err) {
    res.send("Error " + err.message);
  }
});


/* GET LOGGED IN USER */
app.get("/user", async (req, res) => {
  try {

    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token does not exist");
    }

    const payload = jwt.verify(token, "rohit@123");

    const result = await User.findById(payload._id);

    res.send(result);

  } catch (err) {
    res.send("Error " + err.message);
  }
});


/* DELETE USER */
app.delete("/user/:id", async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.send("Deleted Successfully");

  } catch (err) {
    res.send("Error " + err.message);
  }
});


/* UPDATE USER */
app.patch("/user", async (req, res) => {
  try {

    const { _id, ...update } = req.body;

    await User.findByIdAndUpdate(
      _id,
      update,
      { runValidators: true }
    );

    res.send("Update Successfully");

  } catch (err) {
    res.send("Error " + err.message);
  }
});


/* DATABASE CONNECTION */
main()
  .then(() => {
    console.log("Connected to DB");

    app.listen(3000, () => {
      console.log("Listening at port 3000");
    });
  })
  .catch((err) => console.log(err));