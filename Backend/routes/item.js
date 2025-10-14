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

router.delete ('/delete-item', authenticateToken, async (req,res) => {
    try {

        const {itemid} = req.headers;
        await Item.findByIdAndDelete(itemid);

        return res.status(201).json({ message: "Item deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

router.get ('/get-all-item', async (req,res) => {
    try {

        const items = await Item.find().sort({createdAt: -1});

        return res.json({status: "Success", data: items});
        
    } catch (error) {
        res.status(501).json({ message: "internal server error" });
    }
})

router.get ('/get-recent-item', async (req,res) => {
    try {

        const items = await Item.find().sort({createdAt: -1}).limit(5);

        return res.json({status: "Success", data: items});
        
    } catch (error) {
        res.status(501).json({ message: "internal server error" });
    }
})

router.get ('/get-item-by-id:id', async (req,res) => {
    try {

        const {itemid} = req.params;
        const item = await Item.findById(id);

        return res.json({status: "Success", data: item});
        
    } catch (error) {
        res.status(501).json({ message: "internal server error" });
    }
})

module.exports = router;