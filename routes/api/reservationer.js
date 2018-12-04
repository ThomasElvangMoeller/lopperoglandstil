const controller = require("../../controllers/controller");
const express = require('express');
const router = express.Router();
const mongooseId = require('mongoose').Types.ObjectId;


// Send an email to the customer and the shop owner about the reservation
router.post('/', async function (req, res) { 
    try {
        controller.sendReservationEmails(req.body);
        res.send({success:true});
    } catch (error) {
        res.send({success:false, error: error});
    }
})


module.exports = router;
