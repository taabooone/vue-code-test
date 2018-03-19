const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const User = require('../models/user')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


mongoose.connect('mongodb://localhost:27017/vue_test');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.post('/login', (req, res) => {
  User.authUser(req,res);
});
//Employer code
app.post('/users', (req, res) => {
  User.create(req,res);
})
app.get('/users', (req, res) => {
  //get users. Send users;
  User.getUsers(req, res);
});
//Employee code
app.put('/users/:id', (req, res) => {
  User.updateUser(req,res)
});
app.get('/users/:id', (req, res) => {
  User.getUser(req,res)
});

app.listen(process.env.PORT || 3001)
