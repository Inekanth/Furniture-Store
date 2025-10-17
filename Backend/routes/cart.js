const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

router.put("/add-to-cart", authenticateToken, async(req, res)=>{
    try {

        const {itemid, id} = req.headers;
        const userData = await User.findById(id);
        const isItemInCart = userData.favourites.includes(itemid);
        
        if (isItemInCart){
            return res.status(500).json({ message: "item is alrady in cart" });
        }

        await User.findByIdAndUpdate(id,{$push: {cart: itemid}});

        return res.status(500).json({ message: "item is added in favourite" });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

router.put("/remove-from-cart/:itemid", authenticateToken, async(req, res)=>{
    try {

        const {itemid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id,{$pull: {cart: itemid}});

        return res.json({status: "Success", message: "item is added in favourite" });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

router.get("/get-user-cart", authenticateToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({status: "Success", data: cart });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
})



module.exports = router;