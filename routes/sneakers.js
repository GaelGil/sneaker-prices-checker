'use strict';

const express = require('express');
const router = express.Router();
const SneaksAPI = require('../sneaks-api/controllers/sneaks.controllers.js');
const sneaks = new SneaksAPI();

    
// search using the api. then load data to html
router.get('/', function(req, res, next){  
  if (req.query.search) {
    sneaks.getProducts(req.query.search, function(error, products){
      res.render('sneakers/sneakers',{
        products: products
      })
    })
  } else {
    res.redirect('/sneakers/');
  }
});

  
//Grabs all sneakers from the Sneakers database
router.get('/popular', function(req, res){
  sneaks.getMostPopular(function(err, products){
    res.render('sneakers/sneakers', {
      products: products
    });
  });
});


router.get('/:id/detail', function(req, res, next){
  sneaks.getProductPrices(req.params.id, function(error, product){
    res.render('sneakers/detail', {
      apiData: JSON.stringify(product),
    })
  })
});


module.exports = router;
