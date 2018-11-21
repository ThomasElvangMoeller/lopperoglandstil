"use strict";

const Product = require("../models/Product");

// Create a product and save it to the database
exports.createProduct = (name, desc, amount, pics, categories, price, discount) => {
  let product = new Product({
    name: name,
    description: desc,
    amount: amount, 
    pictures: pics,
    categories: categories,
    price: price,
    discount: discount
  });
  return product.save();
};

// Find and return all products in the database
// TODO
exports.getProducts = () => {
  return Product.find().exec();
};
