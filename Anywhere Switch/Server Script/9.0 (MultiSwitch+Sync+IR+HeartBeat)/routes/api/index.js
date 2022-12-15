var express = require("express") ;
var cors = require("cors");

var router = express.Router();

router.use("/",cors(),require("./state"));


module.exports = router;