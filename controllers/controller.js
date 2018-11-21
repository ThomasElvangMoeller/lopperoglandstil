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

//------------------------------------------------------------------------
const Login = require("../models/Login");

// Create a login and save it to the database
// TODO
exports.createLogin = (username, password) => {
    let login = new Login({
        username: username,
        password: password
    });
    return login.save();
};

// Find and return all logins in the database
// TODO
exports.getLogins = () => {
    return Login.find().exec();
};
