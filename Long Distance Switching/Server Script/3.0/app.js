var express = require("express");
var path = require("path");
var app = express();
//var routes = require("./routes/routes");

//Port Assign
app.set("port",process.env.PORT || 80)

//Rendering Engine Set
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");

//Introducing Different Routes to App
app.use("/",require("./routes/web"));
app.use("/api",require("./routes/api"));

//Publically Accessible
app.use(express.static('public'));

//Heyya Start Listening :)
app.listen(app.get("port"),function(){
  console.log("Server listening to Port "+app.get("port"));
})