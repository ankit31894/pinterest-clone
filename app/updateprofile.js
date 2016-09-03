var User = require('./models/user');
module.exports={
    update:function(req,res,next){
    	var rawdata=req.body.info,
    	data={};
        console.log(rawdata);
        console.log(req.body);
    	/*expects like {
			name:'',
			city:'',
			state:''
    	}
    	*/
    	if(rawdata.name!=null&&(typeof rawdata.name === 'string' || rawdata.name instanceof String)&&rawdata.name!='')
    		data.name=rawdata.name;
    	if(rawdata.city!=null&&(typeof rawdata.city === 'string' || rawdata.city instanceof String)&&rawdata.city!='')
    		data.city=rawdata.city;
    	if(rawdata.state!=null&&(typeof rawdata.state === 'string' || rawdata.state instanceof String)&&rawdata.state!='')
    		data.state=rawdata.state;
        User.findOneAndUpdate({
            "_id":req.user.id
        },{
            $set:data
        },{
            new:true
        },function(err,o2){
        console.log("12");
            if(err)return next("Some Error Occured!");
            res.json(o2);
        });

    }
}
