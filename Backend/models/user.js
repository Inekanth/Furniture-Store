const mongoose = require ("mongoose");

const user = new mongoose.Schema ({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : "https://www.freepik.com/icon/yelp_5968937#fromView=search&page=2&position=40&uuid=2a77fb85-4829-4805-b122-b0e1f04ba4f6"
    },
    role : {
        type : String,
        default : "user",
        enum : ["user","admin"]
    },
    favourites : [{
        type : mongoose.Types.ObjectId,
        ref : "furniture"
    }],
    cart : [{
        type : mongoose.Types.ObjectId,
        ref : "furniture"
    }],
    order : [{
        type : mongoose.Types.ObjectId,
        ref : "order"
    }]
}, {timestamps: true});

module.exports = mongoose.model("user",user);