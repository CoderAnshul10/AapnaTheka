const tncMiddleware = (req, res, next) => {
    if (!req.body.tnc) {  // If TnC checkbox is not ticked
        return res.status(400).json({ error: "You must agree to the Terms and Conditions to register." });
    }
    next(); // Proceed if checkbox is checked
};

module.exports = tncMiddleware