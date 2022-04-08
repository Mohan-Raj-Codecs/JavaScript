var express = require("express");
const fs = require('fs');

var router = express.Router();



var oni=false;
var fileName="public/data.json";
var on_data='{"on":true}';
var off_data='{"on":false}';

try {
var data = JSON.parse(fs.readFileSync(fileName));
} catch(err){
    console.log(err);
}

oni=data.on;

//Functions
function inv_write(){ //Write Opposite Data Present in JSON File to the same JSON File | returns None
    if(oni==true){
        oni=false;
        fs.writeFileSync(fileName,off_data , (err) => {
            if (err) throw err;
        });
    }
    else{
        oni=true;
        fs.writeFileSync(fileName,on_data , (err) => {
            if (err) throw err;
        });
    }
}

function readi(){ //Reads the JSON | returns JSON Object
    var jsonString = fs.readFileSync(fileName);
    var data = JSON.parse(jsonString);
    return data.on;
}

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
//Functions END


//Heyya Routes starts here
router.get('/',function(req,res){
    if(oni==true){
         res.render("On");
     }
     else{
         res.render("Off");
     }
 });
// Synchronize
router.post('/switch1',function(req,res){
     if(oni==true){
         res.render("Off");
         off_write();
         oni=false;
     }
     else{
         res.render("On");
         on_write();
         oni=true;
     }
 });




module.exports = router;