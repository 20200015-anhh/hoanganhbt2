const Client = require("../models/Client");
const Type = require("../models/Type");

const getAll = (req, res) => {
  Client.aggregate([
    {
      $lookup: {
        from: "positions",
        localField: "_id",
        foreignField: "owner",
        as: "positions"
      }
    },
    {
      $match: {
        positions: { $size: 0 }
      }
    },
    {
      $project: {
        clientID: "$_id",
        owner: "$name",
        columnnames: [
          "Chưa có dữ liệu",
          "Chưa có dữ liệu",
          "Chưa có dữ liệu",
          "Chưa có dữ liệu",
          "Chưa có dữ liệu"
        ],
        demonames: [],
        demolinks: [],
        propertynames: [],
      }
    },
    {
      $addFields: {
        type: 0
      }
    }
  ])
    .then(results => {
      Client.aggregate([
        {
          $lookup: {
            from: "positions",
            localField: "_id",
            foreignField: "owner",
            as: "positions"
          }
        },
        {
          $unwind: "$positions"
        },
        {
          $lookup: {
            from: "bills",
            localField: "positions._id",
            foreignField: "position",
            as: "bills"
          }
        },
        {
          $match: {
            bills: { $size: 0 }
          }
        },
        {
          $project: {
            clientID: "$_id",
            positionID: "$positions._id",
            position: "$positions.name",
            owner: "$name",
            platform: "$positions.platform",
            demonames: "$positions.demonames",
            size: "$positions.size",
            demolinks: "$positions.demolinks",
            columnnames: [
              "Chưa có dữ liệu",
              "Chưa có dữ liệu",
              "Chưa có dữ liệu",
              "Chưa có dữ liệu",
              "Chưa có dữ liệu"
            ],
            propertynames: [],
          }
        },
        {
          $addFields: {
            type: 0
          }
        }])
      .then((response1) => {
        response1.forEach((item) => {
          results.push(item)
        })
        Client.aggregate([
          {
            $lookup: {
              from: "positions",
              localField: "_id",
              foreignField: "owner",
              as: "positions"
            }
          },
          {
            $unwind: "$positions"
          },
      
          {
            $lookup: {
              from: "bills",
              localField: "positions._id",
              foreignField: "position",
              as: "bills"
            }
          },
          {
            $unwind: "$bills"
          },
          {
            $lookup: {
              from: "types",
              localField: "bills.type",
              foreignField: "num",
              as: "types"
            }
          },
          {
            $unwind: "$types"
          },
          {
            $sort: {
              "bills.type": 1,
              "name": 1,
              "positions.platform": -1,
              "positions.demonames": 1,
              "positions.name": 1
            }
          },
          {
            $project: {
              clientID: "$_id",
              positionID: "$positions._id",
              billID: "$bills._id",
              position: "$positions.name",
              type: "$bills.type",
              owner: "$name",
              method: "$bills.method",
              homepage: "$bills.homepage",
              roadblock: "$bills.roadblock",
              ctr: "$bills.ctr",
              est: "$bills.est",
              platform: "$positions.platform",
              bill: "$bills.bill",
              size: "$positions.size",
              note: "$bills.note",
              demonames: "$positions.demonames",
              demolinks: "$positions.demolinks",
              propertynames: "$types.propertynames",
              columnnames: "$types.columnnames",
            }
          }
        ])
        .then(response2 => {
            response2.forEach((item) => {
              results.push(item)
            })
            Type.find().then((types) => {
              res.render("index", { title: "Báo giá", data: results ,types:types})
            }).catch(err => {
              console.error("Error:", err);
              res.status(500).render("error", { error: err });
            });        
          }).catch(err => {
            console.error("Error:", err);
            res.status(500).render("error", { error: err });
          });
      }).catch(err => {
        console.error("Error:", err);
        res.status(500).render("error", { error: err });
      });
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).render("error", { error: err });
    });
};



module.exports = { getAll };