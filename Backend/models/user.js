const mongoose = require ("mongoose");

const user = new mongoose.Schema ({
    username : {
        Type : String,
        require : true
    },
    email : {
        Type : String,
        require : true,
        unique : true
    },
    password : {
        Type : String,
        require : true
    },
    address : {
        Type : String,
        require : true
    },
    avatar : {
        Type : String,
        default : "https://www.freepik.com/icon/yelp_5968937#fromView=search&page=2&position=40&uuid=2a77fb85-4829-4805-b122-b0e1f04ba4f6"
    },
    role : {
        Type : String,
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