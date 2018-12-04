const controller = require("../../controllers/controller");
const express = require('express');
const router = express.Router();
const mongooseId = require('mongoose').Types.ObjectId;


// Send an email to the customer and the shop owner about the reservation
router.post('/reservation', async function (req, res) { 
    req.body.subject = "Reservations forespørgsel";

    const mailHeader = "<h2>Reservation forespørgsel</h2>";
    const mailFooter = "Denne mail er sendt af en bot kørende på Lopperoglandstils hjemmeside";
    req.body.html = `${mailHeader} <br> ${req.body.html} <br><br> ${mailFooter}`; 

    try {
        controller.sendEmail(req.body);
        res.send({success:true});
    } catch (err) {
        res.send({success:false, error: err});
    }
})


module.exports = router;
