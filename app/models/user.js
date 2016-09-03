var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Img=require("./img.js");

// define the schema for our user model
var userSchema = mongoose.Schema({
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    city:String,
    state:String,
    name:String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
userSchema.methods.hashPassword = function(password) {
    var user = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        user.local.password = hash;
    });

};
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);