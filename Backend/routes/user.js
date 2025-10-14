const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { request } = require("express");
const jwt = require ("jsonwebtoken");
const {authenticateToken} =require ("./userAuth");


// Sign-up route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Basic validation
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 4) {
      return res.status(400).json({ message: "Username must be at least 4 characters long" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // ✅ Define saltRounds before using
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      address,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Signup Error:", error); // 👈 log error to terminal
    res.status(500).json({ message: "internal server error" });
  }
});

// Sign-in route
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({username});

    if (!existingUser) {
        res.status(400).json({message:"Invalite Credential"})
    }

    await bcrypt.compare(password, existingUser.password, (err, data) =>{

        if(data){
            const authClaim = [
                {name: existingUser.username},
                {role: existingUser.role},
            ];
            const token = jwt.sign({authClaim}, "inekanth1999",{
                expiresIn: "30d"
            })
            res.status(200).json({id: existingUser._id, role: existingUser.role, token: token});
        }
        else{
            res.status(400).json({ message: "Invalite Credential"});
        }
    })

    
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.get ("/get-user-information", authenticateToken, async (res, req) => {
    try {
        const {id} = req.headers;
        const data = await User.findOne(id).select(`-password`);
        return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

router.put ("/update-address", authenticateToken, async (res, req) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json("Address is updated");

    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

module.exports = router;
