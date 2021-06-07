require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('passport');



const routes = require('./routes');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);



app.use(flash());

app.use(function(req, res, next) {
    next();
  });
  
app.use(routes);



const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log(`Running On`, port);
 });


module.exports = app;


