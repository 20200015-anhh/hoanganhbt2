const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    position:{
        type:mongoose.ObjectId,
        required: true,
    },
    method:{
        type:String,
    },
    bill:{
        type:String,
    },
    homepage: {
        type:String,
    },
    roadblock:{
        type:String,
    },
    est:{
        type:String,
    },
    ctr:{
        type:String,
    },
    type:{
        type:Number,
    },
    note:{
        type:String,
    }
})

const Bill = mongoose.model('Bill',BillSchema);
module.exports =  Bill
