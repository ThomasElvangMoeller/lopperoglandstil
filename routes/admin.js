const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();


// TODO
router.post('/', function (req, res) {
    const {name, password} = req.body;

console.log('input name: ' + name + password)
    controller.getLogins(name, password)

        .then(result => {
            console.log(controller.getLogins())
            console.log(result)
            if (result.length) {
                req.session.name = name;
                res.send({ok: true})
            }
            else {
                res.send({ok: false})
            }
        })
.catch(error =>{
    console.log(error)
    })
})

// TODO
    router.get('/session', function (req, res) {
        const name = req.session.name;
        if(name) {
            res.render(`session.hbs`,{name});
        }else{
            res.render('loginFail')
        }
        //else: access denied
    });


    router.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/admin');
            }
        });
    });

    module.exports = router;
