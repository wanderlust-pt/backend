const router = require('express').Router();
const database = require('../database/dbConfig');
const bcrypt = require('bcrypt');

// Token generation, cookie
const { genToken } = require('../database/middleware/auth');


// debugging as to why no jwt is being generated

// POST register account
router.post('/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;
    database("users")
      .insert(creds)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(() => {
        res.status(500).json({ error: "Unable to register user" });
      });
  });

// POST login with username and password
router.post('/login', (req, res) => {
    const creds = req.body;
    database("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          //login is successful
          //create token
          const token = genToken(user);
          res
            .status(200)
            .json({ message: `${user.username} is logged in`, token });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(() =>
        res.status(500).json({ message: "Please try logging in again." })
      );
  });

module.exports = router;