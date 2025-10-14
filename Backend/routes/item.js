const router = require("express").Router();
const User = require("../models/user");
const { request } = require("express");
const jwt = require ("jsonwebtoken");
const {authenticateToken} =require ("./userAuth");
const item = require("../models/item");
const Item = require ("../models/item")


router.post ('/add-item', authenticateToken, async (req,res) => {
    try {

        const {id} = req.headers;
        const user = await User.findById(id);

        if (user.role !== "admin"){
            return res.status(400).json({ message: "You haven't access" });
        }

        const item = new Item ({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });

        await book.save();
        return res.status(201).json({ message: "item created successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

router.put ('/update-item', authenticateToken, async (req,res) => {
    try {

        const {itemid} = req.headers;
        await Item.findByIdAndUpdate(itemid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });

        await book.save();
        return res.status(201).json({ message: "Item Updated successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

module.exports = router;