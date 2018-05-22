var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var mongo = require('mongodb');

var adrSchema = new Schema({
     application:       String ,
     project:           String, 
     databaseused:      String, 
     databasepreferred: String
}); 

module.exports = mongoose.model('Adr', adrSchema);