const {validateContact, Contact} = require('../models/contactSchema.js');

// CREATE NEW CONTACT ROUTE STARTS
exports.createNewContact = async (req, res) => {
    const { error } = validateContact(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { name, email, mobile } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            mobile,
            postedBy: req.user._id,
        });
        const result = await newContact.save();

        return res.status(201).json({ ...result._doc });
    } catch (err) {
        console.log(err);
    }
};
// CREATE NEW CONTACT ROUTE ENDS
