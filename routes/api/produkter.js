const controller = require("../../controllers/controller");
const express = require('express');
const router = express.Router();

// TODO
router.get('/', function (req, res) {
    //Get all products in storage
    res.send(`All products`);
})

// TODO
router.get('/:id', function (req, res) {
    //Get information on specific product
    res.send(`Specific product`);
});

// TODO
router.post('/', function (req, res) {
    //Add a specific product to the database
    //product details specified in post request body in json
    res.send(`Product created`);
});

module.exports = router;
