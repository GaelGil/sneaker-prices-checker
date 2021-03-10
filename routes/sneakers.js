'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
// const db = express.Db();
const Sequelize = require('sequelize');
const SneaksAPI = require('sneaks-api');
const { json } = require('sequelize');
const sneaks = new SneaksAPI();
// const { sequelize } = require('../models');


    
//Grabs all sneakers from the Sneakers database
  router.get('/', function(req, res){
    models.Sneakers.findAll().then(function(sneakers){
      res.render('sneakers/all', {
      sneakers: sneakers
      });
    });
  });


  
  
//Grab a single sneaker from the dabase and all others that match its style id
router.get('/:id/detail', function(req, res){
  models.Sneakers.findByPk(req.params.id).then(function(snkr){
    models.Sneakers.findAll({ where: { sneakerName: snkr.sneakerName } }).then(function(sneakers){
      // get data from api
      sneaks.getProductPrices(snkr.styleID, function(err, product){
      res.render('sneakers/detail', {
      sneakers: JSON.stringify(sneakers),
      snkr: snkr,
      apiData: JSON.stringify(product),
    });
  });
});
});
});
  
  


//Grabs all sneakers from the Sneakers database
router.get('/vis', function(req, res){  
sneaks.getProducts('nike', function(error, products){
  models.Sneakers.findAll().then(function(sneakers){
    res.render('sneakers/visuals', {
    sneakers: sneakers,
    maxSnkrs: JSON.stringify(products),
    });
  });
  })
});




    // router.get('/vis', function(req, res){
    //     // models.Sneakers.findAll().then(function(sneakers){
    //       res.render('/sneakers/visuals', {
    //       // sneakers: sneakers
    //       });
    //     // });
    // });


      
module.exports = router;
