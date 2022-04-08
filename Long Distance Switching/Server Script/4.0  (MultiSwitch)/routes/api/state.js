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

function json_read(validate=false){ //Reads the JSON | returns JSON Object
    var jsonString;
    var data;
    if(validate){
        try{
            jsonString = fs.readFileSync(fileName);
            data = JSON.parse(jsonString);
        }catch(err){
            write_off(3); //Customised Write
            jsonString = fs.readFileSync(fileName);
            data = JSON.parse(jsonString);
        }
    }
    else{
        var jsonString = fs.readFileSync(fileName);
        var data = JSON.parse(jsonString);
    }
    return data; //Json Object
}

function write_val(on){
    var data="{";
    for(let i=0;i<on.length;i++){
        if(i==0){ //Logic to denumerate comma on first loop
        data = data+"\"on0\":"+on[0].toString();
        }
        else{     //Logic to numerate comma on next loops
            data=data+",\"on"+i.toString()+"\":"+on[i].toString();
        }
    }
    data=data+"}"
    //data="{\"on1\":"+on1.toString()+",\"on2\":"+on2.toString()+"}";  //Old Logic
    fs.writeFileSync(fileName,data, (err) => {
        if (err) throw err;
    });
}

function write_off(limit){ //Writes Off_Data to API | returns None
    var on=[];
    for(let i=0;i<limit;i++){
        on.push(false);
    }
    write_val(on);
}

router.get("/data",function(req,res){
	res.send(JSON.stringify(json_read(true)));
});

router.get("/reset",function(req,res){
	write_off(3);
	res.send("201"); //Responding with success code
});


module.exports = router;