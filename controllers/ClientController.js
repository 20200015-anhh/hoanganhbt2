const Bill = require("../models/Bill");
const Client = require("../models/Client");
const Position = require("../models/Position");

const addClient = (req, res, next) => {
    const client = new Client({
        name: req.body.name
    })
    client.save()
        .then(response => {
            res.redirect("/")
        })
        .catch(err => {
            res.json({
                message: "Error"
            })
        });
}

const updateClient = (req, res) => {
    const clientID = req.body.id
    const updatedData = {
        name: req.body.name
    }
    Client.findByIdAndUpdate(clientID, { $set: updatedData })
        .then(response => {
            res.redirect("/")
        })
        .catch(err => {
            res.json({
                message: "Error"
            })
        });
}

const deleteClient = (req, res, next) => {
    const clientId = req.params.id;

    Client.findByIdAndDelete(clientId)
        .then(response => {
            Position.find({ owner: clientId })
                .then(positions => {
                    const positionIds = positions.map(position => position._id);
                    Bill.deleteMany(
                        { position: { $in: positionIds } }
                    ).then(response => {
                        Position.deleteMany({ owner: clientId })
                            .then(response => {
                                res.redirect("/")
                            })
                            .catch(err => {
                                res.status(500).json({ message: "Error deleting positions" });
                            });
                    })
                        .catch(err => {
                            res.status(500).json({ message: "Error deleting bills" });
                        });
                })
                .catch(err => {
                    res.status(500).json({ message: "Error finding positions" });
                });
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting client" });
        });
};

module.exports = { addClient, updateClient, deleteClient };