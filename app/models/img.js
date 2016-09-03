var mongoose = require('mongoose');
var User=require("./user.js");

var imgSchema = mongoose.Schema({
    title: String,
    url : String,
    linkers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    uploader:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});
imgSchema.methods.countlinks=function(){
    var obj = this.toObject();
    obj.linkersno=obj.linkers.length;
    delete obj.linkers;
    return obj;
}
imgSchema.methods.haveILinkedAndCount=function(req){
    var obj = this.toObject();

    var isInArray = obj.linkers.some(function (linker) {
        return linker.equals(req.user.id);
    })
    console.log(isInArray);
    if(isInArray)
    	obj.linked=true;
    obj.linkersno=obj.linkers.length;
    delete obj.linkers;
    return obj;
}

module.exports = mongoose.model('Img',imgSchema);