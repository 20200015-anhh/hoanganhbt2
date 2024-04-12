const mongoose = require("mongoose");
var express = require('express');

require("dotenv").config();
const config = require("../../config/config")
mongoose.connect(config.MONGODB_URL_DEV);
const db = mongoose.connection

const Client = require("../../models/Client")
const Bill = require("../../models/Bill")
const Position = require("../../models/Position")

const clients = require("./clients.json");
const rawBills = require("./rawbills.json")
const rawPositions = require("./rawpositions.json")

var app = express();

db.on('error', (err) => {
  console.log(err)
})

db.once('open', async () => {


  //Run first
  // clients.forEach((client, index) => {
  //   const c = new Client(client)
  //   c.save()
  // })


  //Run second
  // Client.find().sort({ "name": 1 }).then(
  //   (results) => {
  //     var i = 0
  //     results.forEach((result) => {
  //       for (; i < rawPositions.length; i++) {
  //         const position = rawPositions[i]
  //         console.log("1:" + position.owner)
  //         console.log("2:" + result.name)
  //         if (position.owner == result.name) {
  //           console.log("1:" + position.owner)
  //           console.log("2:" + result.name)
  //           const p = new Position({
  //             owner: result._id,
  //             name: position.name,
  //             size: position.size,
  //             platform: position.platform,
  //             demonames: position.demonames,
  //             demolinks: position.demolinks
  //           })
  //           p.save()
  //         } else
  //           break
  //       }
  //     })
  //   }
  // )


  //Run third
  // Position.aggregate([
  //   {
  //     $lookup: {
  //       from: "clients",
  //       localField: "owner",
  //       foreignField: "_id",
  //       as: "client"
  //     }
  //   },
  //   {
  //     $unwind: "$client"
  //   },
  //   {
  //     $sort: {
  //       "client.name": 1,
  //       "platform": 1,
  //       "name": 1
  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       clientName: "$client.name",
  //       name: 1,
  //       platform: 1
  //     }
  //   }
  // ])
  //   .then(results => {
  //     var i = 0
  //     results.forEach((result) => {
  //       for (; i < rawBills.length; i++) {
  //         const bill = rawBills[i]
  //         console.log("1:" + bill.position)
  //         console.log("2:" + result.name)
  //         if (bill.owner == result.clientName &&
  //           bill.position == result.name &&
  //           bill.platform == result.platform) {
  //           const b = new Bill({
  //             position: result._id,
  //             method: bill.method,
  //             bill: bill.bill,
  //             homepage: bill.homepage,
  //             roadblock: bill.roablock,
  //             est: bill.est,
  //             ctr: bill.ctr,
  //             type: bill.type,
  //             note: bill.note
  //           })
  //           b.save()
  //         } else
  //           break
  //       }
  //     })
  //   })
  //   .catch(err => {
  //     console.error("Error:", err);
  //     res.status(500).render("error", { error: err });
  //   });
  
})
