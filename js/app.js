const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const https = require("https");
const app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// to get the signup at localhost:3000
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res) {
  const firstname = req.body.fname;

  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed"
    
     }]
};

const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/d4b6fb314b"
  const options = {
    method : "POST",
    auth: "sakshi:42a7161ab79ff7b16df8f5e15945fdb6-us5"
  }
  const request = https.request(url, options, function (response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/index.html");

    }
   
    response.on("data", function(data) {
console.log(JSON.parse(data));
    });
  });
request.write(jsonData);
request.end();
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running in port 3000");
});

