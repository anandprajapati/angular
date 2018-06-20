var exports = module.exports = {};

var Flat = require('./../db-model/Flat.model');
var address = require('./../db-model/address.model');
var owner = require('./../db-model/owner.model');

exports.modifyflat = function(req, res){
    Flat.findOneAndUpdate({no: req.params.no},{$set: {mobile: req.body.mobile,carParking: req.body.carParking}},{upsert:true},function(err,flat){
       if(err){
           res.send("Cou    ld not update the record"+err);
       }
       else{
           res.status(204);
           res.send("Record udpated as"+flat);
       }
    })
}

exports.addflat = function(req,res){
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
    
   newFlat.save(function(err, flat){
        if(err){
            console.log("Error saving the log"+err);
            res.send("something happened..Try aagin");
        }
        else{
            res.send("Your records got saved as below"+newFlat);
        }
    })
}

exports.updateFlatById = function(req,res)
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
}

exports.flatDetails = function(req,res){
    Flat.find({})
    .exec(function(err,results){
        if (err){
            res.send("Something went wrong. Try after some time"); }
        else {
            console.log(results);
            res.json(results);
        }
        })
    }

// module.exports = flatbo;
