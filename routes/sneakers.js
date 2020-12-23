'use strict';

const express = require('express');
const router = express.Router();
// const models = require('../models');

    
//Grabs all sneakers from the Sneakers database
  router.get('/', function(req, res){
    // models.Sneakers.findAll().then(function(sneakers){
      res.render('sneakers/all', {
      // sneakers: sneakers
      });
    // });
  });


  
  
//Grabs all sneakers from the Sneakers database
router.get('/:id/', function(req, res){
  // models.Sneakers.findByPk(req.params.id).then(function(snkr){
  //   models.Sneakers.findAll().then(function(sneakers){
      // console.log(snkr);
      res.render('/sneakers/show', {
      // sneakers: sneakers,
      // snkr: snkr
     });
//   });
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
