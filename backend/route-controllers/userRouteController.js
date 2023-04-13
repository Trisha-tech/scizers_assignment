const User = require('../models/userSchema.js');
const bcrypt = require(`bcrypt`);

// REGISTER NEW USER ROUTE STARTS
exports.registerNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(422).json({ error: "Please enter all the required fields." });
        }

        //Name Validation
        if (name.length > 25)
            return res.status(400).json({ error: "Name can only be less than 25 characters." })

        //Email Validation
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(email))
            return res.status(400).json({ error: "Please enter a valid email address." });

        //Password Validation
        if (password.length < 6)
            return res.status(400).json({ error: "Password must be atleast 6 characters long." });

        const existingUser = await User.findOne({ email: email });

        if (existingUser != null) {
            return res.status(422).json({ error: "User already exists with that email" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name:name, 
                email:email, 
                password: hashedPassword
            });

            const storedNewUser = await newUser.save();

            if (storedNewUser) {
                return res.status(200).json({ message: "New User successfully stored in the database",...storedNewUser._doc });
            }
            else {
                return res.status(422).json({ message: "Error occured in saving new user in the database" });
            }
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: error.message });
    }
};
// REGISTER NEW USER ROUTE ENDS