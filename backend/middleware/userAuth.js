const jwt = require('jsonwebtoken');

const User = require("../models/userSchema.js");

// MIDDLEWARE FOR USER AUTHOIZATION STARTS
module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const token = authorizationHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            try {
                if (err) {
                    return res.status(401).json({ error: "Unauthorized User!" });
                }

                const user = await User.findOne({ _id: payload._id }).select("-password");

                req.user = user;

                next();
            } catch (err) {
                console.log(err);
            }

        })
    } else {
        return res.status(403).json({ error: "Forbidden Account !!!" });
    }
}
// MIDDLEWARE FOR USER AUTHOIZATION ENDS