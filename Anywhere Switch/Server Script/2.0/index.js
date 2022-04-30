const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const port = 80;


var oni=false;
/*
try {
var jsonString = fs.readFileSync("./data.json");
var data = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return;
  }
oni=data.on;
*/
var fileName="./data.json";
var on_data='{"on":true}';
var off_data='{"on":false}';

function inv_write(){
    if(oni==true){
        oni=false;
        fs.writeFile(fileName,off_data , (err) => {
            if (err) throw err;
        });
    }
    else{
        oni=true;
        fs.writeFile(fileName,on_data , (err) => {
            if (err) throw err;
        });
    }
}

function off_write(){
    fs.writeFile(fileName,off_data , (err) => {
        if (err) throw err;
    });
}

function on_write(){
    fs.writeFile(fileName,on_data , (err) => {
        if (err) throw err;
    });
}


app.use(express.json());

app.use(express.urlencoded({
    extended: true}));


app.use(cors());

app.get('/',(req,res)=>{
   if(oni==true){
        res.sendFile(__dirname +"/On.html")
    }
    else{
        res.sendFile(__dirname +"/Off.html")
    }
})
// Synchronize
app.post('/',(req,res)=>{
    if(oni==true){
        res.sendFile(__dirname +"/Off.html")
        off_write()
        oni=false
    }
    else{
        res.sendFile(__dirname +"/On.html")
        on_write()
        oni=true
    }
    //console.log(req.query.jaja)
})

app.listen(port,()=>{
    console.log("Server is listening at port 80")
})
app.use(express.static('./'))