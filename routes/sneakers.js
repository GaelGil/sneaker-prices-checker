'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
// const db = express.Db();
const Sequelize = require('sequelize');
const { sequelize } = require('../models');


    
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
      snkr: snkr,

      // otherStuff: {sneakers.goatPrice}
     });
  });
});
});
  
  


//Grabs all sneakers from the Sneakers database
router.get('/vis', function(req, res){
  models.Sneakers.findAll({ 

    order:[[ Sequelize.fn('min', Sequelize.col('stockXPrice')), 'DESC']],
    // // order: sequelize.fn('min', sequelize.col('stockXPrice')),
    group: ['id'],
    raw: true,
    omitNull: true,
  } ).then(function(maxSnkrs){
  models.Sneakers.findAll().then(function(sneakers){
    res.render('sneakers/visuals', {
    sneakers: sneakers,
    maxSnkrs: JSON.stringify(maxSnkrs)
    });
  });
});
});




    // router.get('/vis', function(req, res){
    //     // models.Sneakers.findAll().then(function(sneakers){
    //       res.render('/sneakers/visuals', {
    //       // sneakers: sneakers
    //       });
    //     // });
    // });


      
module.exports = router;
