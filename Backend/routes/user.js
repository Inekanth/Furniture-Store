const { Router } = require("express");
const router = require("../models/user");
const User = require ("../models/user");

const router = require ("express").Router();

//sign up

router.post ("/sign-up", async (req, res)=>{
    try {
        const {username,email, password, address} = req.body;

        if (username.length < 4){
            return res.status(400).json({message: "username is grater than 3"})
        }

        const existingusername = await User.findOne({username:username});
        if (existingusername){
            return res.status(400).json({message: "username is already exist"})
        }

        const existingemail = await User.findOne({email:email});
        if (existingemail){
            return res.status(400).json({message: "username is already exist"})
        }

        if (password.length <= 8){
            return res.status(400).json({message: "Password length is minimum 8"})
        }

        const newUser = new User (
            {
                username: username,
                password: password,
                email: email,
                address: address
            }
        )
        await newUser.save();

        return res.status(200).json({message: "Successfully created"})

    } catch (error) {
        res.status(500).json({message : "internal server error"})
    }
})

module.exports = router;