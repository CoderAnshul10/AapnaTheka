const express = require('express');
const path = require('path');
const helmet = require('helmet'); // Security middleware
const cors = require('cors'); // Cross-origin requests
const morgan = require('morgan'); // Logging
const session = require('express-session');
const app = express();
const PORT = 8080;

// Import middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const ageVerification = require('./middlewares/ageVerification'); // Age check middleware
const tncMiddleware = require('./middlewares/tncMiddleware'); // TnC check middleware

// Apply middlewares
app.use(helmet()); // Protect against common vulnerabilities
app.use(cors()); // Enable CORS for frontend communication
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use(logger); // Custom logging middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Use session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Import API routes
const apiRoutes = require('./api/apiRoutes1');
app.use('/api', apiRoutes);

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Serve register page
app.get('/api/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Serve homepage
// app.get('/api/homepage', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
// });
// app.get('/api/homepage.js', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'homepage.js'));
// });

// Register route (Ensuring Age & TnC Middleware)
app.post('/api/register', ageVerification, tncMiddleware, (req, res) => {
    res.redirect('/'); // Redirect after successful registration
});


app.get('/api/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, 'public/images', req.params.imageName);
    res.sendFile(imagePath);
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
