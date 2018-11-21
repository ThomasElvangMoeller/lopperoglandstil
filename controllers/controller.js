"use strict";

const Produkt = require("../models/Produkt");

// Create a product and save it to the database
// TODO
exports.createProdukt = () => {
  let produkt = new Produkt({
    
  });
  return produkt.save();
};

// Find and return all products in the database
// TODO
exports.getProdukts = () => {
  return Produkt.find().exec();
};
