const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myownportfolio', { useNewUrlParser: true });

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

var contactSchema = mongoose.model('Contact', contactSchema);


// serve your css as static
app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body)
    
    var myData = new contactSchema(req.body);
    myData.save().then(() => {
        res.status(200).send("Your message has been sent successfully, Thank you !!")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    })
    
    // res.send("Your message has been sent successfully, Thank you !!")
});

app.listen(3000, () => {
    console.log("Website started and is Listening on port 3000");
});