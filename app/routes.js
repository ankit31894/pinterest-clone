module.exports = function(app, passport) {

    // route for home page
    var appDetail=require("../package.json"),
    appName=appDetail.name.replace(/-/g," ");
    // route for home page

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('../public/views/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/getallimgs', function(req, res,next) {
        var allGetter=require("./getallimgs.js");
        allGetter.getAll(req,res,next);
    });
    app.get('/getmyimgs',isLoggedIn2, function(req, res,next) {
        var myGetter=require("./getmyuploadimgs.js");
        myGetter.getAll(req,res,next);
    });
    app.get('/getlinkimgs',isLoggedIn2, function(req, res,next) {
        var myGetter=require("./getmylinkimgs.js");
        myGetter.getAll(req,res,next);
    });
    app.post('/getotherimgs', function(req, res,next) {
        var Getter=require("./getotherimgs.js");
        Getter.getAll(req,res,next);
    });
    app.post('/insertimg',isLoggedIn2, function(req, res,next) {
        var Inserter=require("./insertimg.js");
        Inserter.insertNew(req,res,next);
    });
    app.post('/linkimg', isLoggedIn2,function(req, res,next) {
        var linker=require("./linkimg.js");
        linker.linkNew(req,res,next);
    });
    app.post('/unlinkimg', isLoggedIn2,function(req, res,next) {
        var unlinker=require("./unlinkimg.js");
        unlinker.unlink(req,res,next);
    });
    app.post('/getsinglebook', function(req, res,next) {
        var myGetter=require("./getsinglebook.js");
        myGetter.getById(req,res,next);
    });
    app.get('/getothersbooks', isLoggedIn2,function(req, res,next) {
        var getter=require("./getnotmybooks.js");
        getter.getAll(req,res,next);
    });
    app.post('/maketrade/', isLoggedIn2, function(req, res,next) {
        var maker=require("./maketrade.js");
        maker.proposeNew(req,res,next);
    });
    app.get('/canceltrade/', isLoggedIn2, function(req, res,next) {
        var pollGetter=require("./getpoll.js");
        pollGetter.getById(req,res,next);
    });
    app.post('/accepttrade/', isLoggedIn2, function(req, res,next) {
        var accepter=require("./accepttrade.js");
        accepter.accept(req,res,next);
    });
    app.post('/updateprofile/', isLoggedIn2, function(req, res,next) {
        var updater=require("./updateprofile.js");
        updater.update(req,res,next);
    });
    app.get('/getwishbooks', isLoggedIn2, function(req, res,next) {
        var Sender=require("./sent.js");
        Sender.getSent(req,res,next);
    });
    app.get('/getcomingbooks/', isLoggedIn2, function(req, res,next) {
        Receiver=require("./received.js");
        Receiver.getReceived(req,res,next);
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/checklogged',isLoggedIn2, function(req, res) {
        res.end('1');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/login/twitter', passport.authenticate('twitter'));
    
    // the callback after google has authenticated the user
    app.get('/login/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/',
            failureRedirect : '/'
        }));

    app.get('*', function(req, res) {
        res.render('../public/views/index.ejs',{
            logged:req.isAuthenticated(),
            appName:appName
        }); // load the index.ejs file
    });
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.send(err);
    });
    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function isLoggedIn2(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).json("You have to log In");
}
