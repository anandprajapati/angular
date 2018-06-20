var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var addressSchema = new Schema({
    address_line_1: {type: String,required:true,uppercase: true},
    address_line_2: {type: String,uppercase: true},
    city:{type: String, required:true,uppercase: true},
    state: {type: String, required:true,uppercase: true},
    country:{type: String, required:true,uppercase: true},
    pincode: {type: String, required:true},
    created: {type: Date, default:Date.now},
    remarks: String,
    isCurrent: {type:Boolean, default:false}
})

module.exports = mongoose.model('address',addressSchema, 'addresses'); 