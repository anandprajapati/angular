var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var owner = require('./db-model/owner.model');
var ownerSchema = require('./owner.model');

var FlatSchema = new Schema ({
    flatno: { type: String, unique:true, required:true},
    area: {type:Number},
    carParking: {type: Boolean, default:false},
    carParkingType:{type:String, enum:['Open','Covered','Semi']},
    bldg: {type: String, enum: ['a','b','c'] },
    shareCertificate: Boolean,
    owner: [ownerSchema.schema]  
})

FlatSchema.pre("save", function(next){
    this.bldg = this.bldg.toUpperCase();
    next();
});

module.exports = mongoose.model('flat',FlatSchema,'flats');