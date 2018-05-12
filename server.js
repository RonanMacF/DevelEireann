// Imports
const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Initialise Express Object
const app = express();
const db = require("./config/keys").mongoURI;

//Body parser middleware
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

mongoose
  .connect(db)
  .then(() => console.log("connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
