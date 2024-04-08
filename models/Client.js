const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

var Client = mongoose.model("Client", ClientSchema);
module.exports =  Client;
