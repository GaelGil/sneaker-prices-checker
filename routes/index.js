'use strict';

const express = require('express');
const path = require('path');
const router = express.Router();


// configure serving any static file in public folder
router.use(express.static(path.join(__dirname, '../public')));
/// serve the webpack compiled SPA from the dist folder (in production)
// router.use('/client', express.static(path.join(__dirname, '../dist')));
/// serve libraries installed as node modules
router.use('/libraries/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
router.use('/libraries/cleave', express.static(path.join(__dirname, '../node_modules/cleave.js/dist')));
router.use('/libraries/fontawesome', express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free')));
router.use('/libraries/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
// router.use('/libraries/sneaks-api', express.static(path.join(__dirname, '../node_modules/sneaks-api')));


router.use('/sneakers', require('./sneakers'));




/// serve up the homepage
  router.get('/', function(req, res, next) {
    res.render('index', {
    });
  })

module.exports = router;
