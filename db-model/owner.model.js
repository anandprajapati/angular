var mongoose = require('mongoose');
var addressSchema = require('./address.model');

var Schema = mongoose.Schema;

var ownerSchema = new Schema({
    firstName: {type: String, required:true,uppercase: true},
    LastName: {type: String,uppercase: true},
    addresses: [addressSchema.schema],
    created: {type: Date, default:Date.now},

})

module.exports = mongoose.model('owner',ownerSchema,'owners');