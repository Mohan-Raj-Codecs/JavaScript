var express = require("express");
const fs = require('fs');

var router = express.Router();

var fileName="public/data.json";

var jsonString = fs.readFileSync(fileName);
var data = JSON.parse(jsonString);

router.get("/data",function(req,res){
	res.send(data);
});

module.exports = router;