const express = require('express');
const path = require('path');
const router = express.Router();
const ageVerification = require('../middlewares/ageVerification');
const tncMiddleware = require('../middlewares/tncMiddleware');
const User = require('../models/users');
const Contact = require('../models/contact');


// Login route
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username.trim(), password: password.trim() });

        if (user) {
            console.log("Login successful for:", username);
            req.session.username = username;
            res.redirect('/api/homepage');
        } else {
            console.log("Login failed for:", username);
            res.redirect('/api/register');
        }
    } catch (err) {
        console.error("Error during login:", err);
        next(err);
    }
});

// Register route
router.post('/register', ageVerification, tncMiddleware, async (req, res, next) => {
    const { username, password, age } = req.body;

    try {
        const existingUser = await User.findOne({ username: username.trim() });
        if (existingUser) {
            console.log(`User already exists: ${username}`);
            return res.redirect('/');
        }

        await User.insertOne({
            username: username,
            password: password,
            age
        })
        
        console.log(`User registered successfully: ${username}`);
        res.redirect('/');
    } catch (err) {
        console.error("Error during registration:", err);
        next(err);
    }
});

//Change Password
router.get('/changepassword', (req, res) => {
  res.render(path.join(__dirname, '../views/changepassword.ejs'));
});
router.get('/changepassword.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/changepassword.js'));
});

router.post('/changepassword', async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const username = req.session.username;

    if (!username) {
        return res.status(401).send("Unauthorized: User not logged in");
    }

    if (!oldPassword || !newPassword) {
        return res.status(400).send("Both current and new passwords are required");
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.password !== oldPassword) {
            return res.status(403).send("Incorrect current password");
        }

        await User.updateOne({
            password: newPassword
        })

        res.redirect('/api/homepage');
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).send("Something went wrong!");
    }
});

// HOMEPAGE
router.get('/homepage', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }

    res.render('homepage', {
        username: req.session.username
    });
});
router.get('/homepage.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/homepage.js'));
});

//Contact Us
router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  try {
    await Contact.insertOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        })
    res.redirect('/api/homepage');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//All Pages
router.get('/tnc', (req, res) => {
    res.render(path.join(__dirname, '../views/tnc.ejs'));
});
router.get('/tnc.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/tnc.js'));
});


router.get('/beer', (req, res) => {
    res.render(path.join(__dirname, '../views/beer.ejs'));
});
router.get('/beer.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/beer.js'));
});


router.get('/vodka', (req, res) => {
    res.render(path.join(__dirname, '../views/vodka.ejs'));
});
router.get('/vodka.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/vodka.js'));
});


router.get('/wine', (req, res) => {
    res.render(path.join(__dirname, '../views/wine.ejs'));
});
router.get('/wine.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/wine.js'));
});


router.get('/whiskey', (req, res) => {
    res.render(path.join(__dirname, '../views/whiskey.ejs'));
});
router.get('/whiskey.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/whiskey.js'));
});


router.get('/rum', (req, res) => {
    res.render(path.join(__dirname, '../views/rum.ejs'));
});
router.get('/rum.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/rum.js'));
});


router.get('/gin', (req, res) => {
    res.render(path.join(__dirname, '../views/gin.ejs'));
});
router.get('/gin.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/gin.js'));
});


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Something went wrong!" });
        }
        res.redirect('/');
    });
});

module.exports = router;