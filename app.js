const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");
const { dirname } = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static( __dirname + "/"));

app.post("/",function(req, res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    

    var data = {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
        }
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/a7e93498d1/members";

    const options = {
        method : "POST",
        auth: "jatin:454409203207e77a43bc88182487fa7d-us21"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
     });
     request.write(jsonData);
     request.end();
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("The server is hosted on port 3000");
});
// list id or audience id
// a7e93498d1
// api key
// 454409203207e77a43bc88182487fa7d-us21

