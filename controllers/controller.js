"use strict";

const Product = require("../models/Product");
const mongooseId = require('mongoose').Types.ObjectId;

// Create a product and save it to the database
exports.createProduct = (name, desc, amount, categories, price, unique = false) => {
  let product = new Product({
    name: name,
    description: desc,
    amount: amount, 
    unique: unique,
    pictures: [],
    categories: categories,
    price: price,
  });
  return product.save();
};

exports.getProduct = (id) => {
  return Product.findById(id).exec();
}

// Find and return all products in the database
exports.getProducts = () => {
  return Product.find().exec();
};

exports.updateProduct = (id, reqbody) => {
  let updates = {};
  updates.updated = Date.now();

  if (reqbody.name) { updates.name = reqbody.name};
  if (reqbody.desc) { updates.desc = reqbody.desc};
  if (reqbody.amount) { updates.amount = reqbody.amount};
  if (reqbody.unique) {updates.unique = reqbody.unique};
  if (reqbody.categories) { updates.categories = reqbody.categories};
  if (reqbody.price) { updates.price = reqbody.price};
  if (reqbody.discount) { updates.discount = reqbody.discount};
  if (reqbody.reservedAmount) { updates.reservedAmount = reqbody.reservedAmount};

  Product.updateOne({_id: id}, updates,).exec();
}

exports.deleteProduct = async (id) => {
  let product = await Product.findOneAndDelete({_id:id});
  for (let pic of product.pictures) {
    console.log(`${pic}.jpg`);
  }
}

// Add an array of pictures to a product, and saves it to the database
exports.addPictures = async (product_id, picture_ids) => {
  try {
    await Product.findOneAndUpdate({_id: mongooseId(product_id)}, {$push: {pictures: picture_ids}, updated: Date.now()} ).exec();
    console.log("hej");
  } catch (error) {
    console.log(error)
  }  
}