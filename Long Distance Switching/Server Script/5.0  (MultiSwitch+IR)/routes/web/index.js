var express = require("express");


var router = express.Router();

//TODO : Define the Other Web Routes here


router.use("/",require("./switch")); //for our switch Logic


module.exports = router;