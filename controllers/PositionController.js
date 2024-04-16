const Bill = require("../models/Bill");
const Position = require("../models/Position");

const addPosition = (req, res, next) => {
    const position = new Position({
        name: req.body.name,
        owner: req.body.owner,
        size: req.body.size,
        platform: req.body.platform,
        demonames: req.body.demonames,
        demolinks: req.body.demolinks
    })
    position.save()
        .then(response => {
            res.redirect("/")
        })
        .catch(err => {
            res.json({
                message: "Error"
            })
        });
}

const updatePosition = (req, res, next) => {
    const positionID = req.body.id
    const updatedData = {
        name: req.body.name,
        size: req.body.size,
        platform: req.body.platform,
        demonames: req.body.demonames,
        demolinks: req.body.demolinks
    }
    Position.findByIdAndUpdate(positionID, { $set: updatedData })
        .then(response => { res.redirect("/") })
        .catch(err => {
            res.json({
                message: "Error"
            })
        });
}

const deletePosition = (req, res, next) => {
    const positionID = req.params.id;
    Position.findByIdAndDelete(positionID)
        .then(response => {
            Bill.deleteMany({ position: positionID })
                .then(response => res.redirect("/"))
                .catch(err => {
                    res.json({
                        message: "Error"
                    })
                });
        })
        .catch(err => {
            res.json({
                message: "Error"
            })
        });
}


module.exports = { addPosition, updatePosition, deletePosition};