
var User = require('./models/user');
var Img = require('./models/img');
var trim = require('lodash.trim');
module.exports={
    insertNew:function(req,res,next){
        var img={
            title:req.body.title,
            url:req.body.url,
            uploader:req.user.id
        };
        if(trim(img.title)==""||trim(img.url.trim)==""){
            var s="Empty String";
            s.status=400;
            return next(s)
        }
        var nImg = new Img(img);
        nImg.save(function(er,doc){
            if(er)return next("Some Error Occured");
            var ndoc=doc.toObject();
            ndoc.linkersno=0;
            User.findOne({_id:req.user.id},function(er,user){

                ndoc.uploader={twitter:{username:user.twitter.username}};
                res.json(ndoc);

            })
        })
    }
}