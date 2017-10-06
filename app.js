const dotenv = require('dotenv').config({path: './config/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jwt-simple");
const auth = require("./auth.js")();
const db = require('./db.js');

var cfg = require("./config/jwt.js");
var User = require("./models/user.js");
var app = express();

app.use(bodyParser.json({type:"application/json"})); 
app.use(bodyParser.json({type:"text/json"}));  
app.use(auth.initialize());

app.get("/", (req, res)=>{
    res.json({status:"Hive API Index. Response status 200 - OK"});
})

app.get("/user", auth.authenticate(), async (req, res)=>{
    var user = await User.findByIdAsync(req.user.id);
    res.json(user);
});

app.post("/token", async (req, res)=>{  
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var user = await User.findOneAsync({email: email, password: password});
        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = app;