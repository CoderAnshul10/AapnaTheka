const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs'); // Define logs directory
const logFile = path.join(logDir, 'server.log'); // Define log file path

// Ensure that the logs directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Create the logs directory if it doesn't exist
}

const logger = (req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

    console.log(logMessage); // Fixing console log output

    fs.appendFile(logFile, logMessage, (err) => {
        if (err) console.error('Logging error:', err);
    });

    next(); // Pass control to the next middleware
};

module.exports = logger;
