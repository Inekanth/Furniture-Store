const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

router.put("/add-to-favourite-item", authenticateToken, async(req, res)=>{
    try {

        const {itemid, id} = req.headers;
        const userData = await User.findById(id);
        const isItemFavourite = userData.favourites.includes(itemid);
        
        if (isItemFavourite){
            return res.status(500).json({ message: "item is alrady in favourite" });
        }

        await User.findByIdAndUpdate(id,{$push: {favourites: itemid}});
        return res.status(500).json({ message: "item is added in favourite" });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

router.delete("/remove-item-from-favourite", authenticateToken, async(req, res)=>{
    try {

        const {itemid, id} = req.headers;
        const userData = await User.findById(id);
        const isItemFavourite = userData.favourites.includes(itemid);
        
        if (isItemFavourite){
            await User.findByIdAndUpdate(id,{$pull: {favourites: itemid}});
        }

        return res.status(500).json({ message: "item is removed from favourite" });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})

module.exports = router;

