const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    owner:{
        type:String,
        required: true,
    },
    size: {
        type:String,
    },
    platform:{
        type:String,
    },
    demonames:{
        type:[String]
    },
    demolinks:{
        type:[String]
    }
})

const Position = mongoose.model('Position',PositionSchema)
module.exports =  Position
