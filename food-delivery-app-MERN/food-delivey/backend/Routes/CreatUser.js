const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// Registration/ Sign up
// used for creating a new user. first validate and then push into mongoDB
router.post("/createuser",
[
    body('email','invalid email').isEmail(), //the name 'email' must same as the variable below in create
    body('name','must be longer than 5 character').isLength({min: 5}),
    body('password','Must contain min 5 characters').isLength({min: 5})
]
,async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
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

        if(!(req.body.password === userData.password)){
            return res.status(400).json({ errors: "Incorrect password" });
        }

        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

module.exports = router;