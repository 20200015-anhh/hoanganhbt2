const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  num: {
    type: Number,
    required: true,
  },
  propertynames:{
    type:[String]
  },
  columnnames:{
    type:[String]
  }
});

var Type = mongoose.model("Type", TypeSchema);
module.exports =  Type;
