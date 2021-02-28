'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

    
//Grabs all sneakers from the Sneakers database
  router.get('/', function(req, res){
    models.Sneakers.findAll().then(function(sneakers){
      res.render('sneakers/all', {
      sneakers: sneakers
      });
    });
  });


  
  
//Grabs all sneakers from the Sneakers database
router.get('/:id/detail', function(req, res){
  models.Sneakers.findByPk(req.params.id).then(function(snkr){
    models.Sneakers.findAll({ where: { sneakerName: snkr.sneakerName } }).then(function(sneakers){
      res.render('sneakers/detail', {
      sneakers: sneakers,
      snkr: snkr
     });
  });
});
});
  
  


//Grabs all sneakers from the Sneakers database
router.get('/vis', function(req, res){
  // models.Sneakers.findAll({   where: {'goatPrice': models.Sneakers.max('goatPrice')} } ).then(function(maxSnkrs){
  models.Sneakers.findAll().then(function(sneakers){
    res.render('sneakers/visuals', {
    sneakers: sneakers,
    // maxSnkrs: maxSnkrs
    });
  });
// });
});




    // router.get('/vis', function(req, res){
    //     // models.Sneakers.findAll().then(function(sneakers){
    //       res.render('/sneakers/visuals', {
    //       // sneakers: sneakers
    //       });
    //     // });
    // });


      
module.exports = router;
