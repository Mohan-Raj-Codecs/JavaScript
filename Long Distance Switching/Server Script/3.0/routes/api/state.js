var express = require("express");
const fs = require('fs');

var router = express.Router();

var fileName="public/data.json";

function fetch_data(){  //Fetch Live data from File
	try{
	var jsonString = fs.readFileSync(fileName);
	var data = JSON.parse(jsonString);
	} catch(err){
		console.log(err);
		data="error";
	  }
	return data
}

router.get("/data",function(req,res){
	res.send(fetch_data());
});

module.exports = router;