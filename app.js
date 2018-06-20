var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose').set('debug', true);;
var port = 8181;
var flat1 = require('./routes/flat');

var router = express.Router();

var db='mongodb://localhost:27017/nisarg';
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mydb";

//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect(db);
app.get('/', function(req,res){
    res.send('happy to be here');
})

app.use('/flat',flat1);

// app.get('/flatDetails', )




app.post('/flat2', function(req,res){
    Flat.create(req.body,function(err, flat){
        if(err){
            console.log("Error saving the log"+err);
            res.send("something happened..Try aagin");
        }
        else{
            res.send("Your records got saved as below"+flat);
        }
    })
 //    Flat.create()
 })

 
app.listen(port,function(){console.log("listening on port:"+port);});

