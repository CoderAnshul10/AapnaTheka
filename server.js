const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
const PORT = 8080;

// Custom middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const ageVerification = require('./middlewares/ageVerification');
const tncMiddleware = require('./middlewares/tncMiddleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const apiRoutes = require('./api/apiRoutes');
app.use('/api', apiRoutes);

// Root route (Login Page)
app.get('/', (req, res) => {
    res.render('login');
});

// Register Page
app.get('/api/register', (req, res) => {
    res.render('register');
});

// Redundant safety POST for /register (actual logic handled in apiRoutes)
app.post('/api/register', ageVerification, tncMiddleware, (req, res) => {
    res.redirect('/');
});

// Serve images dynamically
app.get('/api/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, 'public/images', req.params.imageName);
    res.sendFile(imagePath);
});

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
