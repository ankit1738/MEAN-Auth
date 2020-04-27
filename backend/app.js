const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const api = require("./routes/api");
const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/Auth";
mongoose.connect(db, { useNewUrlParser: true }, err => {
    if(err)
    console.error(err);
    else
    console.log("Connected to MongoDB");
});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/api", api);


app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(3000, (err) => {
    if(err) 
        console.log(err);
    
    console.log("Server listening at port 3000");
})