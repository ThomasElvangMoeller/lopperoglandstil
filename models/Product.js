const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the product schema
// TODO
let product = new Schema({
    name: String,
    description: String,
    updated: { type: Date, default: Date.now },
    amount: {type: Number, default: 0},
    // Represents the amount reserved of the product. 0 is falsey, 1 and above is truthy. If reserved amount >= amount {everything reserved}
    reservedAmount: {type: Number, default: 0},  
    // The _id of the pictures in the picture collection
    pictures: [Schema.Types.ObjectId],
    // The categories used for navigation in the catalog
    categories: [String],
    price: {type: Number},
    discount: {type: Number}
});

// Compile the schema into a model and replace the exports object with the model.
// Each instance of a model is representing a document in the database
module.exports = mongoose.model("Product", produkt);