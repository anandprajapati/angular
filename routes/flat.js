var express = require('express');
var flatbo = require('./../businessObjects/flat.bo');

var flat = express.Router();

flat.use(function timelog(req,res,next){
    console.log('Time', Date.now())
    next()
})

// flat.get('/:no',flatbo.addFlat);
flat.post('/', flatbo.modifyflat);
flat.put('/:id', flatbo.updateFlatById);
flat.get('/details',flatbo.flatDetails);

module.exports=flat;