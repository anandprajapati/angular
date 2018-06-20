var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose').set('debug', true);;
var port = 8181;
var Flat = require('./db-model/Flat.model');
var address = require('./db-model/address.model');
var owner = require('./db-model/owner.model');

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

app.get('/flatDetails', function(req,res){
Flat.find({})
.exec(function(err,results){
    if (err){
        res.send("Something went wrong. Try after some time"); }
    else {
        console.log(results);
        res.json(results);
    }
    })
})

app.get('/flat/:id',function(req,res)
{
    console.log("getting a single flat details for :"+req.params.id);
    Flat.findOne({no: { $regex : new RegExp(req.params.id, "i") }})
    .exec(function(err,results){
        if(err) {
            res.json("Do you belong to this society? "+err);
        }
        else {
            res.json(results);
        }
    })
})

app.post('/flat', function(req,res){
   var newFlat = new Flat();
   var own = new owner();
   var addr = new address();
  newFlat.flatno = '501';
  newFlat.area= 1012;
  newFlat.bldg = 'c';
  addr.address_line_1 = 'kaspate wasti';
  addr.address_line_2 = 'some society';
  addr.city='Pune';
  addr.state='MH';
  addr.country='IN';
  addr.pincode='411057';
  own.firstName= 'Anand';
  own.LastName='prajapati';
  own.addresses = [addr];
  newFlat.owner = [own];

  
  //newFlat.owner=


   newFlat.save(function(err, flat){
       if(err){
           console.log("Error saving the log"+err);
           res.send("something happened..Try aagin");
       }
       else{
           res.send("Your records got saved as below"+newFlat);
       }
   })
//    Flat.create()
})

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

 app.put('/flat/:no', function(req, res){
     Flat.findOneAndUpdate({no: req.params.no},{$set: {mobile: req.body.mobile,carParking: req.body.carParking}},{upsert:true},function(err,flat){
        if(err){
            res.send("Could not update the record"+err);
        }
        else{
            res.status(204);
            res.send("Record udpated as"+flat);
        }
     })
 })

app.listen(port,function(){console.log("listening on port:"+port);});

