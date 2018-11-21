const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();


// // TODO
// router.get('/', function (req, res) {
//
// });

// TODO
router.get('/session', function (req, res) {
    //if logged in/legit session: Main admin page
    res.send(`Main admin page`);
    //else: access denied 
});

router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

module.exports = router;
