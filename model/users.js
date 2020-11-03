
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String ,
    lastname : String ,
    age : Number,
})
 mongoose.model('posts',userSchema);