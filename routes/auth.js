const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER ROUTE
router.post('/register', async (req, res) => {

    //Data validation for checking if the provided info is correct or not
    const { error } = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    //Check if email already exists or not in the DB
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) {
        return res.status(400).send('Email already exists!');
    }

    //Hash the password for storing in DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user and save it in the DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    const savedUser = await user.save();
    res.status(200).send(savedUser);
});

//LOGIN ROUTE
router.post('/login', async (req, res) => {

    //Data validation for login route
    const { error } = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    //check if the email exists in DB or not
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send('Email not found!');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)
    {
        return res.status(400).send('Invalid Password!');
    }

    // res.status(200).send('Logged in!');

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200).send(`Logged in! With token ${token}`);
    
});

module.exports = router;