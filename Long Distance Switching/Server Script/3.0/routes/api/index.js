var express = require("express") ;

var router = express.Router();

router.use("/",require("./state"));


module.exports = router;