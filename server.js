const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise= global.Promise;

//Connecting ot the database
mongoose.connect(dbConfig.url,{
    useNewUrlParser:true,

}).then(()=>{
    console.log("Successfully connected to mongo database");
}).catch(err=>{
    console.log("Database connection failed");
    process.exit();
})
//creating an express app
const app= express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//parse requests of content-type application/json
app.use(bodyParser.json());

//defining get call
app.get('/',(req,res)=>{
    res.json({"message":"Welcome to quick notes application. Enjoy making notes and organising your tasks!"});
});
//requiring the routes
require('./app/routes/note.routes')(app);
//app listening on port 3001
app.listen(3001,()=>{
    console.log("App is running on port 3001");
})

