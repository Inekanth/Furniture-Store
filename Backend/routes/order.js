const router = require("express").Router();
const User = require("../models/user");
const Item = require("../models/item");
const Order = require("../models/order");
const {authenticateToken} = require("./userAuth");

router.post("/place-order", authenticateToken, async (req, res) =>{
    try {
        const {id} = req.headers;
        const {order} = req.body;
        for (const orderData of order) {
            const newOrder = new Order ({user: id, item: orderData._id});
            const orderDataFrom = await newOrder.save();
            await User.findByIdAndUpdate(id,{$push: {orders: orderDataFrom._id}});
            await User.findByIdAndUpdate(id,{$pull: {cart: orderData._id}});
            
        }
        return res.json({status: "Success", message: "order created successfully" });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
})

router.get("/get-order-history", authenticateToken, async (req, res) =>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "item"},
        })

        const ordersData = userData.orders.reverse();
        return res.json({status: "Success", data: ordersData});
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
})

router.get('/get-all-order', authenticateToken, async (res,req) =>{
    try{
        const userData = await Order.find().populate({path: "item"}).populate({path: "user"}).sort({createdAt: -1});

        return res.json({status: "Success", data: ordersData});
    }

    catch (error){
       console.log(error);
       res.status(500).json({ message: "An error occurred" }); 
    }
})

router.put('/update-status/:id', authenticateToken, async (res,req) =>{
        try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        
        return res.json({status: "Success", message: "order created successfully" });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
})

module.exports = router;