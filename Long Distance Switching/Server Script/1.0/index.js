const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const port = 8080;


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


app.use(express.json());

app.use(express.urlencoded({
    extended: true}));


app.use(cors());

app.post('/',(req,res)=>{
    inv_write()
    //console.log(req.query.jaja)
})


app.listen(port,()=>{
    console.log("Server is listening at port 8080")
    console.log("Test Server")
})
app.use(express.static('./'))