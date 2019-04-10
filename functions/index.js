const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


var express = require('express');
var app = express();
var path = require('path')
var webpush = require('web-push')
var bodyParser = require('body-parser')
var todos = require("./serverSrc/todos")
var addTodo = require("./serverSrc/addTodo")
var { addSubscribers } = require("./serverSrc/pushNotify")


app.use(express.static('public'))
 
// parse application/json
app.use(bodyParser.json())



app.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/todos', todos);

app.post('/addTodo', addTodo);

app.post('/subscribe', (req, res) => {
    const subscription = req.body.pushSubscription;
    const user = req.body.user
    addSubscribers(subscription, user)
    console.log(subscription)
    res.status(201).json({});
});

exports.app = functions.https.onRequest(app);