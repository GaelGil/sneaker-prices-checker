'use strict';

const express = require('express');
const router = express.Router();
// const models = require('../models');
// const db = express.Db();
const SneaksAPI = require('../sneaks-api/controllers/sneaks.controllers.js');
const sneaks = new SneaksAPI();



    
//Grabs all sneakers from the Sneakers database
  router.get('/', function(req, res){
    sneaks.getMostPopular(function(err, products){
      res.render('index', {
      sneakers: products
      });
    });
  });


  
  
//Grab a single sneaker from the dabase and all others that match its style id
router.get('/:id/detail', function(req, res){
      // get data from the api using the styleID given
      sneaks.getProductPrices(snkr.styleID, function(err, product){
      res.render('sneakers/detail', {
        // load data into html
      apiData: JSON.stringify(product),
    });
  });
});



// search using the api. then load data to html
router.get('/search', function(req, res, next){  
  if (req.query.search) {
    sneaks.getProducts(req.query.search, function(error, products){
      res.render('sneakers/search',{
        products: products
      })
    })
  } else {
    res.redirect('/sneakers/');
  }

});


router.get('/:id/more', function(req, res, next){
  sneaks.getProductPrices(req.params.id, function(error, product){
    res.render('sneakers/moreDetail', {
      apiData: JSON.stringify(product),
    })
  })
});


module.exports = router;
