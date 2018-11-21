const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the product schema
// TODO
let produkt = new Schema({
});

// Compile the schema into a model and replace the exports object with the model.
// Each instance of a model is representing a document in the database
module.exports = mongoose.model("Produkt", produkt);