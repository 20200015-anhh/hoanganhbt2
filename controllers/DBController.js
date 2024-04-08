const Bill = require("../models/Bill");
const Client = require("../models/Bill")

const getAllAdRates = (req, res) => {
  Bill.aggregate([
    {
      $lookup: {
        from: "positions",
        let: { owner: { $toLower: "$owner" }, position: { $toLower: "$position" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $toLower: "$owner" }, "$$owner"] },
                  { $eq: [{ $toLower: "$name" }, "$$position"] }
                ]
              }
            }
          },
          {$sort: { "platform": 1 ,"demonames":1} }
        ],
        as: "position_info"
      }
    },
    {$sort: { "owner": 1,"bill":1 } }
  ])
  .then(results => {
    Client
    res.render("index", {title:"baogia", data:results})
  })
  .catch(err => {
    console.error("Error:", err);
    res.status(500).render("error", { error: err });
  });
};

module.exports = { getAllAdRates };