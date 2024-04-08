var express = require('express');
var router = express.Router();

/* GET datas listing. */
router.get('/', function (req, res, next) {
    // Fetch data from MongoDB using Client model
  // Client.find({ name: "cafef.vn" }, function (err, clients) {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send("Error occurred while querying the database.");
  //   } else {
  //     // Render the page with the retrieved data
  //     
  //   }
  // });
})

module.exports = router;
