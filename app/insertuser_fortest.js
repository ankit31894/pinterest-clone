var User = require('./models/user');
module.exports={
    insert:function(req,res,next){
    	var nUser=new User({twitter:{id:req.body.userId}})
        nUser.save(function(err,user){
            if(err)return next("Some error occured");
            res.json(user);
        });
    }
}
