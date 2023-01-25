var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// Serves Files From Public Library
app.use(express.static('public'));
app.use(cors());

// GET - Create a New User
app.get('/users/create/:name/:email/:uid', function (req, res) {
    // Check If User is Already in DB
    dal.find(req.params.email).
        then((users) => {
            // If Duplicate User Throw Error
            if(users.length > 0) {
                console.log('User already exists');
                res.send('User already exists');    
            }
            else {
                // CREATE - Otherwise Create a New User
                dal.create(req.params.name, req.params.email, req.params.uid).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }
        });
});

// GET Login a User 
app.get('/users/login/:email/:password', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            // Verify Password if User Exists
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// GET Find a User
app.get('/users/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// GET A User by Email { Email Field Search }
app.get('/users/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// PATCH - Update - Deposit/Withdraw Amount
app.get('/users/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// GET All Account
app.get('/users/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Running on port ${port}`);
});