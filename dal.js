const dotenv = require("dotenv")
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const url         = process.env.MONGODB_URI;
let db            = null;
 
// Connect to MongoDB
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");
    // Connect to Database
    db = client.db('CapstoneDB');
});

// Create a New User Account
function create(name, email, uid) {
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, uid, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// Find Existing User
function find(email) {
    return new Promise((resolve, reject) => {    
        const users = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// Find Existing User
function findOne(email) {
    return new Promise((resolve, reject) => {    
        const users = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// PATCH - Update Deposit/Withdrawl
function update(email, amount) {
    return new Promise((resolve, reject) => {    
        const users = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            

    });    
}

// GET All Users
function all() {
    return new Promise((resolve, reject) => {    
        const users = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

module.exports = {create, findOne, find, update, all};