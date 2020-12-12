'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


// 
// View all sneakers
// 
router.get('/', function(req, res, next) {
    models.Question.findAll().then(function(records){
        res.render('snaekers/index', {
        records: records
        });
      });
  });
  

// 
// View one sneaker
// 
router.get('/:id/', function(req, res, next) {
    models.Sneakers.findByPk(req.params.id).then(function(snkr){
        models.Sneakers.findAll().then(function(sneakers){
          res.render('sneakers/sneaker', {
          sneakers: sneakers,
          snkr: snkr
         });
      });
    });
});









module.exports = router;