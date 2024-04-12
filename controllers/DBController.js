const Position = require("../models/Position");

const getAll = (req, res) => {
  Position.aggregate([
    {
      $lookup: {
        from: "bills",
        localField: "_id",
        foreignField: "position",
        as: "bills"
      }
    },
    {
      $unwind: "$bills"
    },
    {
      $lookup: {
        from: "clients",
        localField: "owner",
        foreignField: "_id",
        as: "client"
      }
    },
    {
      $unwind: "$client"
    },
    {
      $sort: {
        "bills.type":1,
        "client.name": 1,
        "platform": 1,
        "name": 1
      }
    },
    {
      $project: {
        _id: 0,
        type: "$bills.type",
        owner: "$client.name",
        position: "$name",
        method: "$bills.method",
        homepage: "$bills.homepage",
        roablock: "$bills.roadblock",
        ctr: "$bills.ctr",
        platform: 1,
        bill: "$bills.bill",
        size:1,
        note: "$bills.note",
        demonames: 1,
        demolinks: 1
      }
    }
  ])
  .then(results => {
    console.log(results);
    res.render("index", {title:"baogia", data:results})
  })
  .catch(err => {
    console.error("Error:", err);
    res.status(500).render("error", { error: err });
  });
};



module.exports = { getAll };