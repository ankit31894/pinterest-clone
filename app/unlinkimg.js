
var User = require('./models/user');
var Img = require('./models/img');
module.exports={
    unlink:function(req,res,next){
        Img.update({
            "_id":req.body.id
        },{
            $pull:{
                'linkers':req.user.id
            }
        },function(err,o){
            if(err)return next("Some Error Occured!");
            res.json(o);
        });
    }
}
