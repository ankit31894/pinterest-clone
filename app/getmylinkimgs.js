var User = require('./models/user');
var Img = require('./models/img');
module.exports={
    getAll:function(req,res,next){
        Img.find({'linkers':req.user.id}).populate({path:'uploader',select:'twitter.username'}).exec(function(err,imgs){
            if(err)return next("Some error occured");
            var nImgs=[];
            if(req.user!=null)
            	imgs.forEach(function(img,i){
	            	nImgs.push(img.haveILinkedAndCount(req));
            	})
            else
            	imgs.forEach(function(img,i){
            		nImgs.push(img.countlinks());
            	})
            res.json(nImgs);
        });
    }
}