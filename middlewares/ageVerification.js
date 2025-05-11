const ageVerification = (req, res, next) => {
    const { age } = req.body;

    if (!age || isNaN(age)) {
        return res.status(400).json({ error: "Age is required and must be a number." });
    }

    if (age < 21) {
        return res.status(403).json({ error: "You must be 21 or older to register." });
    }

    next(); // Proceed if age is valid
};

module.exports = ageVerification