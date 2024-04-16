const Bill = require("../models/Bill");

const addBill = (req, res,next) => {
    console.log(req.body);
    const bill = new Bill({
        position:req.body.position,
        method:req.body.method,
        bill:req.body.bill,
        homepage: req.body.homepage,
        roadblock:req.body.roadblock,
        est:req.body.est,
        ctr:req.body.ctr,
        type:req.body.type,
        note:req.body.note
    })
    bill.save()
    .then(response => {
        res.redirect("/")
    })
    .catch(err => {
        res.json({
            message:"Error"
        })
      });
}

const updateBill = (req, res,next) => {
    const billID = req.params.id
    const updatedData = {
        method:req.body.method,
        bill:req.body.bill,
        homepage: req.body.homepage,
        roadblock:req.body.roadblock,
        est:req.body.est,
        ctr:req.body.ctr,
        type:req.body.type,
        note:req.body.note
    }
    Bill.findByIdAndUpdate(billID,{$set:updatedData})
    .then(response => {
        res.redirect("/")
    })
    .catch(err => {
        res.json({
            message:"Error"
        })
      });
}

const deleteBill = (req, res,next) => {
    const billID =  req.params.id;
    Bill.findByIdAndDelete(billID)
    .then(response => {
        res.redirect("/")
    })
    .catch(err => {
        res.json({
            message:"Error"
        })
      });
} 


module.exports = { addBill,updateBill,deleteBill };