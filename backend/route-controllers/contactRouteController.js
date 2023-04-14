const { validateContact, Contact } = require('../models/contactSchema.js');
const mongoose = require("mongoose");


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

// GET REGISTERED USER CONTACTS ROUTE STARTS
exports.getMyContacts = async (req, res) => {
    try {
        const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
            "postedBy",
            "-password"
        );

        return res.status(200).json({ contacts: myContacts.reverse() });
    } catch (err) {
        console.log(err);
    }
};
// GET REGISTERED USER CONTACTS ROUTE ENDS



// EDIT A CONTACT ROUTE STARTS
exports.editContact = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "No ID Specified." });
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: "Please enter a valid ID" });

    try {
        const contact = await Contact.findOne({ _id: id });

        if (req.user._id.toString() !== contact.postedBy._id.toString())
            return res
                .status(401)
                .json({ error: "Can't edit other people contacts!" });

        const updatedData = { ...req.body, id: undefined };
        const result = await Contact.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return res.status(200).json({ ...result._doc });
    } catch (err) {
        console.log(err);
    }
};
// EDIT A CONTACT ROUTE ENDS


// DELETE A CONTACT ROUTE STARTS
exports.deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "No ID Specified." });

    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: "Please enter a valid ID" });
    try {
        const contact = await Contact.findOne({ _id: id });
        if (!contact) return res.status(400).json({ error: "No Contact Found" });

        if (req.user._id.toString() !== contact.postedBy._id.toString())
            return res
                .status(401)
                .json({ error: "Can't delete other people contacts!" });

        const result = await Contact.deleteOne({ _id: id });
        const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
            "postedBy",
            "-password"
        );

        return res
            .status(200)
            .json({ ...contact._doc, myContacts: myContacts.reverse() });
    } catch (err) {
        console.log(err);
    }
};
      // DELETE A CONTACT ROUTE ENDSS