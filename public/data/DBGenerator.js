const mongoose = require("mongoose");
var express = require('express');

require("dotenv").config();
const config = require("../config/config")
mongoose.connect(config.MONGODB_URL_DEV);
const db = mongoose.connection

const Client = require("../../models/Client")
const Bill = require("../../models/Bill")
const Position = require("../../models/Position")

const clients = require("./clients.json");
const bills = require("./bills.json")
const positions = require("./positions.json")

var app = express();

db.on('error', (err) => {
  console.log(err)
})

db.once('open', async () => {
  clients.forEach((client, index) => {
    const c = new Client(client)
    c.save()
  })
  bills.forEach((bill, index) => {
    const b = new Bill(bill)
    b.save()
  })
  positions.forEach((position, index) => {
    const p = new Position(position)
    p.save()
  })
})




