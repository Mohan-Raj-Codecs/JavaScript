var express = require("express");
const fs = require('fs');
const https = require('https');

var router = express.Router();

var fileName="public/data.json";

var On_Data=[false,false,false,false];

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
            write_off(4); //Customised Write
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

function json_dump(data){
    fs.writeFileSync(fileName, JSON.stringify(data), 'utf8', function (err) {
        if (err){
            throw err;
        }
    });
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

function req_https(x){
    var abc;
    https.get(x, (resp)=>{
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
          abc=data
        });
        // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log("Sent "+resp.statusCode+" "+x+"\nGot "+abc+"\n\n")
            return data; //Here END
        });
        
    }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
    
    
}

function multi_sync(x,booll,complex=false){
    booll=str_to_bool(booll,true)
    let data=json_read();
    if(x=="on0"){
        req_https("https://api.switchur.com/Switch1/"+booll+"/7CN0X9C3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //0
        if(complex){
            req_https("https://api.switchur.com/Switch2/"+str_to_bool(data.on1)+"/7G16AE93V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //1
            req_https("https://api.switchur.com/Switch3/"+str_to_bool(data.on2)+"/6WNRX6A3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //2
            req_https("https://api.switchur.com/Switch4/"+str_to_bool(data.on3)+"/2WPAEYA3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //3
        }
    }
    if(x=="on1"){
        req_https("https://api.switchur.com/Switch2/"+booll+"/7G16AE93V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //1
        if(complex){
            req_https("https://api.switchur.com/Switch1/"+str_to_bool(data.on0)+"/7CN0X9C3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //0
            req_https("https://api.switchur.com/Switch3/"+str_to_bool(data.on1)+"/6WNRX6A3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //2
            req_https("https://api.switchur.com/Switch4/"+str_to_bool(data.on3)+"/2WPAEYA3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //3
        }
    }
    if(x=="on2"){
        req_https("https://api.switchur.com/Switch3/"+booll+"/6WNRX6A3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //2
        if(complex){
            req_https("https://api.switchur.com/Switch1/"+str_to_bool(data.on0)+"/7CN0X9C3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //0
            req_https("https://api.switchur.com/Switch2/"+str_to_bool(data.on1)+"/7G16AE93V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //1
            req_https("https://api.switchur.com/Switch4/"+str_to_bool(data.on3)+"/2WPAEYA3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //3
        }
    }
    if(x=="on3"){
        req_https("https://api.switchur.com/Switch4/"+booll+"/2WPAEYA3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //3
        if(complex){
            req_https("https://api.switchur.com/Switch1/"+str_to_bool(data["on0"])+"/7CN0X9C3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //0
            req_https("https://api.switchur.com/Switch2/"+str_to_bool(data["on1"])+"/7G16AE93V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //1
            req_https("https://api.switchur.com/Switch3/"+str_to_bool(data["on2"])+"/6WNRX6A3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2") //2
        }
    }
}

router.get("/data",function(req,res){
	res.send(JSON.stringify(json_read(true)));
});

router.get("/flip/:switch/:state",function(req,res){
    On_Data=json_read();
    try{On_Data[req.params.switch]=(req.params.state=="true") ? true : false;}catch(err){};
    json_dump(On_Data);

    //Switchur
    
    if(req.params.switch=="on0")
        req_https("https://api.switchur.com/Switch1/"+req.params.state+"/7CN0X9C3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
        console.log("Sent On0")
    if(req.params.switch=="on1")
        req_https("https://api.switchur.com/Switch2/"+req.params.state+"/7G16AE93V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
        console.log("Sent On1")
    if(req.params.switch=="on2")
        req_https("https://api.switchur.com/Switch3/"+req.params.state+"/6WNRX6A3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
        console.log("Sent On2")
    if(req.params.switch=="on3")
        req_https("https://api.switchur.com/Switch4/"+req.params.state+"/2WPAEYA3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
        console.log("Sent On3")


    res.send("201");
})

router.get("/reset",function(req,res){
	write_off(4);
    //Switchur
    req_https("https://api.switchur.com/Switch1/off/7CN0X9C3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
    req_https("https://api.switchur.com/Switch2/off/7G16AE93V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
    req_https("https://api.switchur.com/Switch3/off/6WNRX6A3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
    req_https("https://api.switchur.com/Switch4/off/2WPAEYA3V3H06RB929DKM66DZ2VT3K8SCHW2C74XM86EPZZMH14VBDD2")
	res.send("201"); //Responding with success code
});

router.get("/test",function(req,res){

res.send("as");

})

module.exports = router;