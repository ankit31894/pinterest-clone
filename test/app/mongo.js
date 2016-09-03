// This test is for node JS

var db=require("../../config/database.js");
var should=require('should');
var insertUser=require("../../app/insertuser_fortest.js");
var insertImg=require("../../app/insertimg.js");
var linkImg=require("../../app/linkimg.js");
var getallImg=require("../../app/getallimgs.js");
var getmylinkImg=require("../../app/getmylinkimgs.js");
var unlinkImg=require("../../app/unlinkimg.js");
var getmyuploadImg=require("../../app/getmyuploadimgs.js");

describe('Insert User Test', function() {
    this.timeout(5000);
    before(function(done) {
        db.connect(1);
        done();
    })
    after(function(done) {
        db.drop();
        done();
    })
    var userId1=1234;
    var userId2=12345;
    var userId3=123456;
    var user1Id;
    var user2Id;
    var user3Id;
    var img1Id,img2Id,img3Id;
    function th(done){
        return function(err){
            console.log(err);
            err.should.not.equal("");
            done();
        }
    }
    it('should insert a user with twitter.id 1234', function(done) {
        insertUser.insert({body:{userId:userId1}},{json:function(record){
            record.twitter.id.should.eql("1234");
            user1Id=record._id;
            done();
        }},th(done));
    });
    it('should insert a user with twitter.id 12345', function(done) {
        insertUser.insert({body:{userId:userId2}},{json:function(record){
            record.twitter.id.should.eql("12345");
            user2Id=record._id;
            done();
        }},th(done));
    });
    it('should insert a user with twitter.id 123456', function(done) {
        insertUser.insert({body:{userId:userId3}},{json:function(record){
            record.twitter.id.should.eql("123456");
            user3Id=record._id;
            done();
        }},th(done));
    });
    it('should insert a img for user1', function(done) {
        insertImg.insertNew({body:{title:"Test Img",url:"http://test_url"},user:{id:user1Id}},{json:function(record){
            img1Id=record._id;
            record.title.should.eql("Test Img");
            done();
        }},th(done));
    });
    it('should insert a img for user2', function(done) {
        insertImg.insertNew({body:{title:"Test Img2",url:"http://test_url"},user:{id:user2Id}},{json:function(record){
            img2Id=record._id;
            record.title.should.eql("Test Img2");
            done();
        }},th(done));
    });
    it('should insert another img for user2', function(done) {
        insertImg.insertNew({body:{title:"Test Img3",url:"http://test_url"},user:{id:user2Id}},{json:function(record){
            img3Id=record._id;
            record.title.should.eql("Test Img3");
            done();
        }},th(done));
    });
    it('should link img1 for user1', function(done) {//own image
        linkImg.linkNew({body:{id:img1Id},user:{id:user1Id}},{json:function(record){
            record.ok.should.eql(1);
            record.nModified.should.eql(1);
            done();
        }},th(done));
    });
    it('should link img2 for user1', function(done) {//own image
        linkImg.linkNew({body:{id:img2Id},user:{id:user1Id}},{json:function(record){
            record.ok.should.eql(1);
            record.nModified.should.eql(1);
            done();
        }},th(done));
    });
    it('should get all  images', function(done) {//own image
        getallImg.getAll({},{json:function(record){
            record.length.should.eql(3);
            record[0].linkersno.should.eql(1);
            done();
        }},th(done));
    });
    it('should get link user1 images', function(done) {//own image
        getmylinkImg.getAll({user:{id:user1Id}},{json:function(record){
            record.length.should.eql(2);
            done();
        }},th(done));
    });
    it('should unlink img1 for user1', function(done) {//own image
        unlinkImg.unlink({body:{id:img1Id},user:{id:user1Id}},{json:function(record){
            record.ok.should.eql(1);
            record.nModified.should.eql(1);
            done();
        }},th(done));
    });
    it('should get link user1 images', function(done) {//own image
        getmylinkImg.getAll({user:{id:user1Id}},{json:function(record){
            record.length.should.eql(1);
            done();
        }},th(done));
    });
    it('should get user2 uploaded images', function(done) {//own image
        getmyuploadImg.get({user:{id:user2Id}},{json:function(record){
            record.length.should.eql(2);
            done();
        }},th(done));
    });
});