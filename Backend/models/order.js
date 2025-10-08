const mongoose = require ("mongoose");

const order = new mongoose.Schema ({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    item : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    status : {
        type : String,
        default : "Order placed",
        enum : ["order placed", "out for delivery, deelivered, canceled"]
    },
    
}, {timestamps: true});

module.exports = mongoose.model("order",order);