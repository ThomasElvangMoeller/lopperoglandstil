"use strict";
const config = require('../config');
const Product = require("../models/Product");
const mongooseId = require('mongoose').Types.ObjectId;
const fs = require('fs');

//--------------------Products------------------------
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

// Updates a product, only updates the fields that is included in the request body
exports.updateProduct = (id, reqbody) => {
  let updates = {};
  updates.updated = Date.now();

  if (reqbody.name) { updates.name = reqbody.name};
  if (reqbody.desc) { updates.description = reqbody.desc};
  if (reqbody.amount) { updates.amount = reqbody.amount};
  if (reqbody.unique) {updates.unique = reqbody.unique};
  if (reqbody.categories) { updates.categories = reqbody.categories};
  if (reqbody.price) { updates.price = reqbody.price};
  if (reqbody.discount) { updates.discount = reqbody.discount};
  if (reqbody.reservedAmount) { updates.reservedAmount = reqbody.reservedAmount};

  Product.updateOne({_id: id}, updates,).exec();
}

// Delete a specific product and the pictures of the product
exports.deleteProduct = async (id) => {
  let product = await Product.findOne({_id:id});
  for (let pic of product.pictures) {
    fs.exists(`./public/uploads/${pic}.jpg`, function(exists) {
      if(exists) {
        fs.unlink(`./public/uploads/${pic}.jpg`, (err) => {
          if (err) throw err;
        });
      } else {
        console.log('File not found, so not deleting.');
      }
    });
  }
  Product.deleteOne({_id:id}).exec();
}

exports.deletePicturesFromProduct = async (product_id, picture_ids) => {

  let product = await Product.findOneAndUpdate({_id: mongooseId(product_id)}, {$pullAll: {pictures: picture_ids}, updated: Date.now()} ).exec();

  if (product) {
    for (let pic of picture_ids) {
      fs.exists(`./public/uploads/${pic}.jpg`, function(exists) {
        if(exists) {
          fs.unlink(`./public/uploads/${pic}.jpg`, (err) => {
            if (err) throw err;
          });
        } else {
          console.log('File not found, so not deleting.');
        }
      });
    }
  }

}

// Add an array of pictures to a product, and saves it to the database
exports.addPictures = async (product_id, picture_ids) => {
  try {
    await Product.findOneAndUpdate({_id: mongooseId(product_id)}, {$push: {pictures: picture_ids}, updated: Date.now()} ).exec();
  } catch (error) {
    console.log(error)
  }
}

//------------------------------Login----------------------------------
const Login = require("../models/Login");

// Create a login and save it to the database
exports.createLogin = (username, password) => {
    let login = new Login({
        username: username,
        password: password
    });
    return login.save();
};

// Find and return all logins in the database
exports.getLogins = (name,pass) => {
    return Login.find({username: name, password: pass}).exec();
};


//----------------------------Reservations------------------------------
const nodemailer = require('nodemailer');

// Sends an email from the mail account specified in config file.
exports.sendEmail = (reqbody) => {
  const transporter = nodemailer.createTransport(config.transporter);

  const mailOptions = {
    from: reqbody.from,       // sender address
    to: config.notifyEmail,   // list of receivers
    subject: reqbody.subject, // Subject line
    html: reqbody.html        // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      throw err
    else
      console.log(info);
 });
}