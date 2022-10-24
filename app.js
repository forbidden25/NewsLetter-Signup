// require Modules
//jshint esversion: 6

const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = 3000;

//body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//public folder for images and css
app.use(express.static("public"));



//index.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

}); //app.get

//app.post index.html
app.post("/", function(req, res)  {
  const fName = req.body.FirstName;
  const lName = req.body.LastName;
  const email = req.body.Email;
  const uniqueID = "c92fc64deb";

//mailchimp data
  const data = {
    members: [{

        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: fName,
          LNAME: lName,
          EMAIL: email,
        }


    }] //members array
  }; //var data

//JSON data
const jsonData = JSON.stringify(data);
const url = "https://us9.api.mailchimp.com/3.0/lists/c92fc64deb"
const options = {
  method: "POST",
  auth: "forbidden25:b8badce8b63907d5ff087df669772bc5-us9"
}
//http get request
const request = https.request(url,options, function(response) {

if (response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}




  response.on("data", function(data){
    console.log(JSON.parse(data));


  });//response.on

});//http get

request.write(jsonData);
request.end();




});//app.post index.html route




//failure route
app.post("/failure", function(req,res){
    res.redirect("/");

});//failure route








//api key = b8badce8b63907d5ff087df669772bc5-us9



//process.env.PORT < HEROKU
//app listen port
app.listen(process.env.PORT || port, function() {
  console.log("Example app listening on port 3000");
}); //app.listen
