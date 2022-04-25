var express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const https = require('https');


var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


//Global vars
const fileName="public/data.json";
json_sort(validate=true); //Validating JSON
var data=json_read();
console.log(data);


//Functions
//json Func
function json_read(validate=false){ //Reads the JSON | returns JSON Object\
    
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

function str_to_bool(x,inv=false){
    if(inv)
        return ("false"===x)
    else
        return ("true"===x) //Bool
}

function json_sort(validate=false){
    try {
        let data = json_read(validate);
        let key = Object.keys(data);
        key.sort();//Sorted keys
        let sorted_json_obj = {};
        for(let i=0;i<key.length;i++){
            sorted_json_obj[key[i]]=data[key[i]];
        }
        json_dump(sorted_json_obj);
    }
    catch(err){
        console.log(err);
    }
}

function json_dump(data){
    fs.writeFileSync(fileName, JSON.stringify(data), 'utf8', function (err) {
        if (err){
            throw err;
        }
    });
}

function json_len(){
    try{
        return json_read().length; //int
    }
    catch(err){
        console.log(err);
    }
}
//json Func END

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

function write_on(limit){ //Writes On_Data to API | returns None
    var on=[];
    for(let i=0;i<limit;i++){
        on.push(true);
    }
    write_val(on);
}

function req_https(x){
    https.get(x, (resp)=>{
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log(data);
            console.log("Sent "+resp.statusCode+" "+x+"\nGot "+data+"\n\n")
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

//Functions END


//Heyya Routes starts here
router.get('/',function(req,res){
    data=json_read();
    res.render("Switch",{data:data});
 
});

router.get('/reset',function(req,res){
    res.render("Reset",{data:data});
});

// Synchronize
router.post('/switch',function(req,res){

    //write_off();
    if(req.body.on0!=undefined){
        data.on0=str_to_bool(req.body.on0,inv=true);//converting string to bool
        json_dump(data);
        multi_sync("on0",req.body.on0)
    }
    if(req.body.on1!=undefined){
        data.on1=str_to_bool(req.body.on1,inv=true);
        json_dump(data);
        multi_sync("on1",req.body.on1)
    }
    if(req.body.on2!=undefined){
        data.on2=str_to_bool(req.body.on2,inv=true);
        json_dump(data);
        multi_sync("on2",req.body.on2)
    }
    if(req.body.on3!=undefined){
        data.on3=str_to_bool(req.body.on3,inv=true);
        json_dump(data);
        multi_sync("on3",req.body.on3)
    }
    
    //json_dump(data);
    
    //console.log(data);
    //console.log("The End");

    res.render("Switch",{data:data});

 });




module.exports = router;