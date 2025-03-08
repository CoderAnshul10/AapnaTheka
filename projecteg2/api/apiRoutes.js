const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const ageVerification = require('../middlewares/ageVerification');
const tncMiddleware = require('../middlewares/tncMiddleware');

// Login route
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
        if (err) return next(err);
        
        const users = JSON.parse(data);

        console.log("Received login request:", username, password);
        console.log("Loaded users:", users);

        const user = users.find(u => u.username.trim() === username.trim() && u.password.trim() === password.trim());

        if (user) {
            console.log("Login successful for:", username);
            return res.status(302).redirect('/api/homepage');
        } else {
            console.log("Login failed for:", username);
            return res.status(302).redirect('/api/register'); // Redirect if user not found
        }
    });
});


// Register route
router.post('/register', ageVerification, tncMiddleware, (req, res) => {
    const { username, password, age } = req.body;
    const newUser = { username: username.trim(), password: password.trim(), age };

    fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading users.json:", err);
            return res.status(500).json({ error: "Something went wrong!" });
        }

        let users = [];
        if (data) {
            try {
                users = JSON.parse(data);
            } catch (parseError) {
                console.error("Error parsing users.json:", parseError);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }

        // Check if the username already exists
        if (users.some(user => user.username === newUser.username)) {
            console.log(`User already exists: ${newUser.username}`);
            return res.redirect('/'); // Redirect to login if user exists
        }

        // Add new user to the list
        users.push(newUser);

        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error writing to users.json:", err);
                return res.status(500).json({ error: "Something went wrong!" });
            }
            console.log(`User registered successfully: ${newUser.username}`);
            res.redirect('/'); // Redirect to login page after successful registration
        });
    });
});


router.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/homepage.html'));
});
router.get('/homepage.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/homepage.js'));
});


router.get('/tnc', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/tnc.html'));
});
router.get('/tnc.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/tnc.js'));
});


router.get('/beer', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/beer.html'));
});
router.get('/beer.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/beer.js'));
});


router.get('/vodka', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/vodka.html'));
});
router.get('/vodka.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/vodka.js'));
});


router.get('/wine', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/wine.html'));
});
router.get('/wine.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/wine.js'));
});


router.get('/whiskey', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/whiskey.html'));
});
router.get('/whiskey.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/whiskey.js'));
});


router.get('/rum', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/rum.html'));
});
router.get('/rum.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/rum.js'));
});


router.get('/gin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/gin.html'));
});
router.get('/gin.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/gin.js'));
});


module.exports = router;