const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

// TODO
router.get('/', function (req, res) {
    //Login page 
    res.send(`Login page`);
}) 

// TODO
router.get('/session', function (req, res) {
    //if logged in/legit session: Main admin page
    res.send(`Main admin page`);
    //else: access denied 
});

module.exports = router;
