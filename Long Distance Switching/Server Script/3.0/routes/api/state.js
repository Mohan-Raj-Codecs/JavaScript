var express = require("express");
const fs = require('fs');

var router = express.Router();

var fileName="public/data.json";
var on_data='{"on":true}';
var off_data='{"on":false}';

function off_write(){ //Writes Off_Data to API | returns None
    fs.writeFile(fileName,off_data , (err) => {
        if (err) throw err;
    });
}

function on_write(){ //Writes On_Data to API | returns None
    fs.writeFile(fileName,on_data , (err) => {
        if (err) throw err;
    });
}
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

router.get("/flip_on",function(req,res){
	on_write();
	res.send("200");
});

router.get("/flip_off",function(req,res){
	off_write();
	res.send("200");
});

module.exports = router;