const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username) {
            return res.status(400).json({error: "Please provide a username"});
        };

        if (!email) {
            return res.status(400).json({error: "Please provide a email"});
        };

        if (!password) {
            return res.status(400).json({error: "Please provide a password"});
        };

        if (password.length < 8 || password.length >= 16) {
            return res.status(400).json({error: "Password length should be in between 8 to 16 characters!"});
        };

        const existingUser = await User.findOne({email});
        
        if (existingUser) {
            return res.status(400).json({error: "User Already Exists!"});
        };

        const hash = bcrypt.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hash
        });

        await newUser.save();

        return res.status(201).json({message: "User creation successfull..."});

    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

module.exports = {signup};