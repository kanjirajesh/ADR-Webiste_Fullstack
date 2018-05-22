var express = require('express');
var router  = express.Router();
var csrf    = require('csurf')
var passport = require('passport');
var adrpath = require('../controller/adr.controller');
var Adr     = require('../models/adr');
var User    = require('../models/user');
var assert = require('assert');
var objectId = require('mongodb').ObjectID;

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', notLoggedIn, function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', 
 passport.authenticate('local.signup',{
 successRedirect: '/user/login',
 failureRedirect: '/user/signup',
 failureFlash: true
})) ;


router.get('/login', function(req, res, next) {
 var messages = req.flash('error');
 res.render('user/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/login', 
 passport.authenticate('local.login',{
 successRedirect: '/user/adr',
 failureRedirect: '/user/login',
 failureFlash: true
})) ;

router.get('/adr', isLoggedIn, function(req, res, next) {
  var appl = Adr.distinct('application');
  appl.exec(function (err, vola) {
    if (err) {
        throw Error;
    }        
  res.render('user/adr', {application: vola});
  });
});  


router.get('/adr/docs/:application', isLoggedIn, function(req, res, next) {
  var appl = Adr.distinct('application');
  appl.exec(function (err, vola) {
    if (err) {
        throw Error;
    }
  console.log(" HURRAY " );
  console.log(req.params.application);
  Adr.find({application : req.params.application}, function (err,adr) 
        {
        if (err)
        {
          res.redirect('/');
        }
        console.log(adr);
        res.render('user/adr',{project: adr , application: vola});
    
      });
    }); 
  });

  router.get('/adr/:id', function(req, res) {
    Adr.findById(req.params.id, function (err, adr) 
    {
    
      if (err)
      {
        res.redirect('/');
      }
      return res.render('user/view_adr', adr);
    });
  });


  router.get('/view_adr', function(req, res)
{
      console.log("alas!");
      res.render('user/view_adr');
});

  

/* router.get('/select_app', function(req, res, next) {
  res.render('user/select_app') ;
})

router.get('/select_app/:id', isLoggedIn, function(req, res, next) {
  console.log('i am in it');
        res.render('user/adr');
   
  });
 */

router.get('/adr/edit/:id', function(req, res){
  Adr.findById(req.params.id, function (err,adr) 
  {
  
    if (err)
    {
      res.redirect('/');
    }
    //console.log(adr);
    var messages = req.flash('error');
    res.render('user/edit_adr',{csrfToken: req.csrfToken(), messages: messages , adr: adr});

  });
});


  router.get('/create_adr', function(req, res, next) {
    var messages = req.flash('error');
   res.render('user/create_adr', {csrfToken: req.csrfToken(), messages: messages});
    }); 

  router.post('/create_adr', isLoggedIn, function(req, res, next) 
{
     return adrpath.create(req, res);
}); 



router.get('/edit_adr', function(req, res,adr)
{
      console.log('I just passed here');
      var messages = req.flash('error');
       res.render('user/edit_adr',adr);
});

router.post('/edit_adr' ,
function(req, res, next)
{
  console.log('In post now');
  var item = 
  {
    application: req.body.application,
    project: req.body.project,
    databaseused: req.body.databaseused,
    databasepreferred: req.body.databasepreferred
  };
  var id = req.body.id;
  //assert.equal(null, err);
  Adr.updateOne({"_id": objectId(id)},  { $set: item},
  function(err, result)
  {
    assert.equal(null,err);
    console.log('Item updated');
    res.redirect('/user/adr');    
  });
});

router.get('/adr/:id/delete', function(req, res) {
    Adr.findByIdAndRemove({
      _id: req.params.id
    }, function(err, adr) {
      if(err) {
        res.send('error removing')
      } else {
        console.log(adr);
        res.redirect('/user/adr');
      }
    });
  });
 
  router.get('/logout', isLoggedIn, function(req, res, next)
  {
      req.logout();
      res.redirect('/');
  });
  
  router.use('/', function(req, res, next)
  {
      next();
  });
  
 
/* router.post('/user/edit_adr', function(req, res, next) {
  console.log('crossed this one');
  Adr.updateOne
   ({ _id: req.params.id },
    { $set: { application: req.body.application , project: req.body.project }},
    {upsert: true}, 
    function(err, newAdr) 
    {
    if (err) 
    {
      res.send('error updating ');
    } 
    else 
    {
      console.log(newAdr);
      res.render('user/adr', {csrfToken: req.csrfToken(), messages: messages});
    }
  });
});
 */

/* router.put('/adr/:id', function(req, res){
	user.findByIdAndUpdate({_id: req.params.id},
	                   {
			   	  application: req.body.application,
          project   : req.body.project,
          databaseused   : req.body.databaseused,
          databasepreferred   : req.body.databasepreferred,
			   }, function(err, docs){
         if(err) 
         {
           console.log('Error');
           res.json(err);
         }
				else
				{ 
				   console.log(docs);
				   res.render('/adr');
         }
        });
			 });
 */

  

  module.exports = router;

function isLoggedIn(req, res, next) 
{
    if (req.isAuthenticated())
     {
        return next();
     }
     res.redirect('/');
}

function notLoggedIn(req, res, next) 
{
   if (!req.isAuthenticated())
    {
       return next();
    }
    
    res.redirect('/');
} 
 