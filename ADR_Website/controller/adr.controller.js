var passport = require('passport');
var Adr = require('../models/adr');
var flash    = require('connect-flash');

exports.create = function(req, res) 
{
    /* var entry = new Adr
    ({
        application : req.application,
        project     : req.project,
        databaseused : req.databaseused,
        databasepreferred : req.databasepreferred 
    }); 
 */
        
    /* Adr.findOne({'project': project}, function(err, adr) 
    {
        if(err) 
        {
            return done(err);
        }
        if (adr) 
        {
            return done(null, false, {message: project + ' is already registered !!'});
        } */ 

        var entry = new Adr();
        entry.application = req.body.application;
        entry.project = req.body.project;
        entry.databaseused = req.body.databaseused;
        entry.databasepreferred = req.body.databasepreferred;
    
    
/*         entry.save(function(err, result) 
        {
            if(err) 
            {
                return done(err);
            }
            return done(null, entry);
        }); 
 */
    entry.save();
    
    
    //redirect to adr page
    res.redirect(301, '../user/adr');
};

exports.getadr= function(req,res) 
{
    res.render('create_adr', {title: 'Adr - New ADR'});
};