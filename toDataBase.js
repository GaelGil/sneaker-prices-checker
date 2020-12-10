const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const models = require('./models');
const express = require('express');



sneaks.getProducts("jordan 1", function(error, products){
    if (error) {
        console.log(error)
        // res.send("Product Not Found");
      } else {
        for (let x =0; x < products.length; x++){
          product = products[x]
          // console.log(product.brand);
          models.Sneakers.create({
            sneakerName: product.shoeName,
            colorway: product.colorWay,
            releaseDate: product.releaseDate,
            retailPrice: product.retailPrice,
            stockXPrice: product.lowestResellPrice.stockX,
            goatPrice: product.lowestResellPrice.goat,
            stadiumGoodsPrice: product.lowestResellPrice.stadiumGoods,
            flightClubPrice: product.lowestResellPrice.flightClub,
            silhoutte: product.silhoutte,
            styleID: product.styleID,
            brand: product.brand
          })
  
  
  
         }
      }
})



sneaks.getProducts("yeezy", function(error, products){
  if (error) {
      console.log(error)
      // res.send("Product Not Found");
    } else {
      for (let x =0; x < products.length; x++){
        product = products[x]
        // console.log(product.brand);
        models.Sneakers.create({
          sneakerName: product.shoeName,
          colorway: product.colorWay,
          releaseDate: product.releaseDate,
          retailPrice: product.retailPrice,
          stockXPrice: product.lowestResellPrice.stockX,
          goatPrice: product.lowestResellPrice.goat,
          stadiumGoodsPrice: product.lowestResellPrice.stadiumGoods,
          flightClubPrice: product.lowestResellPrice.flightClub,
          silhoutte: product.silhoutte,
          styleID: product.styleID,
          brand: product.brand
        })



       }
    }
})
sneaks.getProducts("puma", function(error, products){
  if (error) {
      console.log(error)
      // res.send("Product Not Found");
    } else {
      for (let x =0; x < products.length; x++){
        product = products[x]
        // console.log(product.brand);
        models.Sneakers.create({
          sneakerName: product.shoeName,
          colorway: product.colorWay,
          releaseDate: product.releaseDate,
          retailPrice: product.retailPrice,
          stockXPrice: product.lowestResellPrice.stockX,
          goatPrice: product.lowestResellPrice.goat,
          stadiumGoodsPrice: product.lowestResellPrice.stadiumGoods,
          flightClubPrice: product.lowestResellPrice.flightClub,
          silhoutte: product.silhoutte,
          styleID: product.styleID,
          brand: product.brand
        })



       }
    }
})


sneaks.getProducts("adidas", function(error, products){
  if (error) {
      console.log(error)
      // res.send("Product Not Found");
    } else {
      for (let x =0; x < products.length; x++){
        product = products[x]
        // console.log(product.brand);
        models.Sneakers.create({
          sneakerName: product.shoeName,
          colorway: product.colorWay,
          releaseDate: product.releaseDate,
          retailPrice: product.retailPrice,
          stockXPrice: product.lowestResellPrice.stockX,
          goatPrice: product.lowestResellPrice.goat,
          stadiumGoodsPrice: product.lowestResellPrice.stadiumGoods,
          flightClubPrice: product.lowestResellPrice.flightClub,
          silhoutte: product.silhoutte,
          styleID: product.styleID,
          brand: product.brand
        })



       }
    }
})


sneaks.getMostPopular(function(error, products){
  if (error) {
      console.log(error)
      // res.send("Product Not Found");
    } else {
      for (let x =0; x < products.length; x++){
        product = products[x]
        // console.log(product.brand);
        models.Sneakers.create({
          sneakerName: product.shoeName,
          colorway: product.colorWay,
          releaseDate: product.releaseDate,
          retailPrice: product.retailPrice,
          stockXPrice: product.lowestResellPrice.stockX,
          goatPrice: product.lowestResellPrice.goat,
          stadiumGoodsPrice: product.lowestResellPrice.stadiumGoods,
          flightClubPrice: product.lowestResellPrice.flightClub,
          silhoutte: product.silhoutte,
          styleID: product.styleID,
          brand: product.brand
        })



       }
    }
})


// npx sequelize-cli model:generate --name Sneakers --attributes sneakerName:string,colorway:string,releaseDate:string,retailPrice:integer,stockXPrice:integer,goatPrice:integer,stadiumGoodsPrice:integer,flightClubPrice:integer,silhoutte:string,styleID:integer

