
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var KittenSchema = new Schema({
name : String ,
user: Schema.ObjectId ,
})
 mongoose.model('Kitten',KittenSchema);


 