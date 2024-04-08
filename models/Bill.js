const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    position:{
        type:String,
    },
    method:{
        type:String,
    },
    owner:{
        type:String,
        required: true,
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
})

const Bill = mongoose.model('Bill',BillSchema);
module.exports =  Bill
