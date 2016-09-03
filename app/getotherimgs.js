var User = require('./models/user');
var Img = require('./models/img');
module.exports={
    get:function(req,res,next){
        Img.find({}).populate({path:'uploader',match:{'twitter.username':req.body.id}}).exec(function(err,imgs){
            if(err)return next("Some error occured");
            imgs.forEach(function(img,i){
            	imgs[i]=img.countlinks();
            })
            res.json(imgs);
        });
    }
}


var User = require('./models/user');
var Img = require('./models/img');

module.exports={
    getAll:function(req,res,next){
        Img.find({}).populate({path:'uploader',match:{'twitter.username':req.body.id},select:'twitter.username'}).exec(function(err,imgs){
            if(err)return next("Some error occured");
			imgs = imgs.filter(function(img) {
			    return img.uploader; // return only imgs with uploader matching exisiting query
			});
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