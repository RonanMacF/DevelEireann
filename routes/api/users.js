const gravatar = require("gravatar");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users Works"
  })
);

// @route   GET api/users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User & Return JWT web token
// @access  Public
router.post("/login", (req, res) => {
  // Get email and Password
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check if it found a user
    if (!user) {
      return res.status(404).json({
        email: "User not found"
      });
    }

    //Check user submitted password matches hashed password in DB
    bcrypt.compare(password, user.password).then(isMatch => {
      //User found and Password match
      if (isMatch) {
        // Create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.acatar
        };

        //Sign JWT token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 }, // 1 Hour = 3600 seconds
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

module.exports = router;
