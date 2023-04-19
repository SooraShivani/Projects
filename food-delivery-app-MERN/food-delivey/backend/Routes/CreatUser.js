const express = require('express')
const router = express.Router()

const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// generating a secret key - 32 characters
const jwtSecret = '$#&MyMongoExpressReactNodeApp&$#'

// Registration/ Sign up
// used for creating a new user. first validate and then push into mongoDB
router.post("/createuser",
[
    // creating an endpoint: localhost:5000/api/createuser
    body('email','invalid email').isEmail(), //the name 'email' must same as the variable below in create
    body('name','must be longer than 5 character').isLength({min: 5}),
    body('password','Must contain min 5 characters').isLength({min: 5})
]
,async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.create({
            name: req.body.name,
            // password: req.body.password,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
            // req.body.<whatever_in_body_variable>
        })
        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

// logging in an existing user
router.post("/loginuser",
[
    body('email','invalid email').isEmail(), //the name 'email' must same as the variable below in create
    body('password','Must contain min 5 characters').isLength({min: 5})
]
,async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await User.findOne({email});
        if(!userData){
            // if it exists, then you get the entire user's data
            // if the entered email does not exist, then 
            return res.status(400).json({ errors: "Incorrect Email" });
        }

        // the below cant be used since the hashed value of password is stored in the database
        // if(!(req.body.password === userData.password)){
        //     return res.status(400).json({ errors: "Incorrect password" });
        // }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if(!pwdCompare){
            return res.status(400).json({ errors: "Incorrect password" });
        }

        // JWT token must be sent to the user on successful login, so that they can store it locally

        // for creating signature, JWT
        const data = {
            user:{
                id: userData.id
            } 
        }

        const authToken = jwt.sign(data,jwtSecret)
        res.json({success:true, authToken: authToken});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

module.exports = router;