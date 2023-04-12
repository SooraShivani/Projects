const express = require('express')
const router = express.Router()
const User = require('../models/User')

// used for creating a new user
router.post("/createuser",async (req, res) =>{
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

module.exports = router;